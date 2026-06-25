import { marked } from "marked";

import certifications from "../content/certifications.json";
import experience from "../content/experience.json";
import resumes from "../content/resumes.json";
import services from "../content/services.json";
import settings from "../content/settings.json";
import skills from "../content/skills.json";
import speaking from "../content/speaking.json";
import testimonials from "../content/testimonials.json";

const projectModules = import.meta.glob("../content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

const articleModules = import.meta.glob("../content/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

const labModules = import.meta.glob("../content/labs/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

let cachedMarkdownCollections = null;

function normalizeLineEndings(value) {
  return value.replace(/\r\n?/g, "\n");
}

function parseScalar(value) {
  const trimmed = value.trim();

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  if (trimmed === "null") {
    return null;
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();

    return inner ? splitInlineArray(inner).map(parseScalar) : [];
  }

  return trimmed;
}

function splitInlineArray(value) {
  const items = [];
  let current = "";
  let quote = null;

  for (const character of value) {
    if ((character === '"' || character === "'") && !quote) {
      quote = character;
      current += character;
      continue;
    }

    if (character === quote) {
      quote = null;
      current += character;
      continue;
    }

    if (character === "," && !quote) {
      items.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  if (quote) {
    throw new Error("Unsupported frontmatter: unterminated quoted inline array value.");
  }

  items.push(current.trim());

  return items;
}

function countIndent(line) {
  const match = line.match(/^ */);

  return match ? match[0].length : 0;
}

function parseObjectLine(value) {
  const separatorIndex = value.indexOf(":");

  if (separatorIndex === -1) {
    return null;
  }

  return {
    key: value.slice(0, separatorIndex).trim(),
    value: value.slice(separatorIndex + 1).trim()
  };
}

function assertSupportedLine(line) {
  if (line.includes("\t")) {
    throw new Error("Unsupported frontmatter: tabs are not supported for indentation.");
  }
}

function parseBlockScalar(lines, startIndex, baseIndent, marker) {
  const blockIndent = baseIndent + 2;
  const blockLines = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];
    const indent = countIndent(line);

    if (line.trim() && indent <= baseIndent) {
      break;
    }

    if (!line.trim()) {
      blockLines.push("");
      index += 1;
      continue;
    }

    if (indent < blockIndent) {
      throw new Error("Unsupported frontmatter: block scalar content must be indented.");
    }

    blockLines.push(line.slice(blockIndent));
    index += 1;
  }

  const style = marker[0];
  const chomp = marker.slice(1);

  if (!["", "-"].includes(chomp)) {
    throw new Error(`Unsupported frontmatter: block scalar marker "${marker}".`);
  }

  if (style === "|") {
    const literal = blockLines.join("\n");

    return {
      value: chomp === "-" ? literal : `${literal}\n`,
      nextIndex: index
    };
  }

  const foldedValue = blockLines.reduce((result, line) => {
    if (!line.trim()) {
      return result.endsWith("\n") ? result : `${result}\n`;
    }

    if (!result) {
      return line.trim();
    }

    return result.endsWith("\n")
      ? `${result}${line.trim()}`
      : `${result} ${line.trim()}`;
  }, "");

  return {
    value: chomp === "-" ? foldedValue : `${foldedValue}\n`,
    nextIndex: index
  };
}

function collectIndentedBlock(lines, startIndex, parentIndent) {
  const block = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim() && countIndent(line) <= parentIndent) {
      break;
    }

    block.push(line);
    index += 1;
  }

  return { block, nextIndex: index };
}

function parseArrayBlock(lines, indent) {
  const items = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    assertSupportedLine(line);

    if (!line.trim()) {
      continue;
    }

    if (countIndent(line) !== indent || !line.trimStart().startsWith("- ")) {
      throw new Error("Unsupported frontmatter: arrays must use consistently indented '- ' items.");
    }

    const trimmed = line.trim();

    const itemSource = trimmed.slice(2);
    const objectLine = parseObjectLine(itemSource);

    if (!objectLine) {
      items.push(parseScalar(itemSource));
      continue;
    }

    const item = {
      [objectLine.key]: objectLine.value
        ? parseScalar(objectLine.value)
        : {}
    };

    while (index + 1 < lines.length) {
      const nextLine = lines[index + 1];
      const nextIndent = countIndent(nextLine);

      if (!nextLine.trim()) {
        index += 1;
        continue;
      }

      if (nextIndent === indent && nextLine.trimStart().startsWith("- ")) {
        break;
      }

      if (nextIndent <= indent) {
        throw new Error("Unsupported frontmatter: nested array object fields must be indented.");
      }

      if (nextIndent !== indent + 2) {
        throw new Error("Unsupported frontmatter: nested array object indentation is inconsistent.");
      }

      index += 1;
      const nestedLine = parseObjectLine(nextLine.trim());

      if (!nestedLine) {
        throw new Error("Unsupported frontmatter: nested array object fields must be key/value pairs.");
      }

      if (!nestedLine.value) {
        throw new Error("Unsupported frontmatter: nested objects inside arrays are not supported.");
      }

      item[nestedLine.key] = parseScalar(nestedLine.value);
    }

    items.push(item);
  }

  return items;
}

function parseFrontmatterLines(lines, indent = 0) {
  const data = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    assertSupportedLine(line);

    if (!line.trim()) {
      continue;
    }

    const lineIndent = countIndent(line);

    if (lineIndent !== indent) {
      throw new Error("Unsupported frontmatter: object fields must use consistent indentation.");
    }

    const field = parseObjectLine(line);

    if (!field) {
      throw new Error("Unsupported frontmatter: object fields must be key/value pairs.");
    }

    if (field.value) {
      if (field.value.startsWith("|") || field.value.startsWith(">")) {
        const { value, nextIndex } = parseBlockScalar(
          lines,
          index + 1,
          indent,
          field.value
        );

        data[field.key] = value;
        index = nextIndex - 1;
        continue;
      }

      data[field.key] = parseScalar(field.value);
      continue;
    }

    const { block, nextIndex } = collectIndentedBlock(lines, index + 1, indent);

    if (!block.length) {
      data[field.key] = {};
      continue;
    }

    const blockIndent = indent + 2;

    if (block.some((blockLine) => blockLine.trim() && countIndent(blockLine) < blockIndent)) {
      throw new Error("Unsupported frontmatter: nested content must be indented.");
    }

    data[field.key] = block.some(
      (blockLine) => blockLine.trim() && countIndent(blockLine) === blockIndent && blockLine.trimStart().startsWith("- ")
    )
      ? parseArrayBlock(block, blockIndent)
      : parseFrontmatterLines(block, blockIndent);
    index = nextIndex - 1;
  }

  return data;
}

function parseMarkdownFile(raw) {
  const normalized = normalizeLineEndings(raw);
  const lines = normalized.split("\n");

  if (lines[0] !== "---") {
    return { data: {}, content: normalized };
  }

  const closingIndex = lines.findIndex((line, index) => index > 0 && line === "---");

  if (closingIndex === -1) {
    return { data: {}, content: normalized };
  }

  return {
    data: parseFrontmatterLines(lines.slice(1, closingIndex)),
    content: lines.slice(closingIndex + 1).join("\n").replace(/^\n/, "")
  };
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripRawHtml(value) {
  return value.replace(/<\/?[A-Za-z][^>\n]*>/g, "");
}

function isSafeLinkUrl(url) {
  return (
    typeof url === "string" &&
    (url.startsWith("http:") ||
      url.startsWith("https:") ||
      url.startsWith("mailto:") ||
      url.startsWith("/") ||
      url.startsWith("#"))
  );
}

export function renderMarkdown(markdown) {
  const renderer = new marked.Renderer();

  renderer.link = ({ href, title, tokens }) => {
    const text = renderer.parser.parseInline(tokens);

    if (!isSafeLinkUrl(href)) {
      return text;
    }

    const titleAttribute = title ? ` title="${escapeHtml(title)}"` : "";

    return `<a href="${escapeHtml(href)}"${titleAttribute}>${text}</a>`;
  };

  renderer.image = ({ href, title, text }) => {
    if (!isSafeLinkUrl(href)) {
      return escapeHtml(text || "");
    }

    const titleAttribute = title ? ` title="${escapeHtml(title)}"` : "";

    return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text || "")}"${titleAttribute}>`;
  };

  return marked.parse(escapeHtml(stripRawHtml(markdown)), { renderer });
}

export function readMarkdownCollection(modules) {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const { data, content } = parseMarkdownFile(raw);

      return {
        ...data,
        path,
        body: content,
        html: renderMarkdown(content)
      };
    })
    .filter((item) => item.draft !== true)
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

export function getPortfolioContent() {
  if (!cachedMarkdownCollections) {
    cachedMarkdownCollections = {
      projects: readMarkdownCollection(projectModules),
      articles: readMarkdownCollection(articleModules),
      labs: readMarkdownCollection(labModules)
    };
  }

  return {
    settings,
    resumes,
    services,
    experience,
    skills,
    testimonials,
    certifications,
    speaking,
    ...cachedMarkdownCollections
  };
}

export function findBySlug(items, slug) {
  return items.find((item) => item.slug === slug) || null;
}
