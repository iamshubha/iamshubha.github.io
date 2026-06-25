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

    return inner ? inner.split(",").map(parseScalar) : [];
  }

  return trimmed;
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

function parseArrayBlock(lines) {
  const items = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed || !trimmed.startsWith("- ")) {
      continue;
    }

    const itemSource = trimmed.slice(2);
    const objectLine = parseObjectLine(itemSource);

    if (!objectLine) {
      items.push(parseScalar(itemSource));
      continue;
    }

    const item = {
      [objectLine.key]: objectLine.value
        ? parseScalar(objectLine.value)
        : parseFrontmatterLines([])
    };

    while (index + 1 < lines.length) {
      const nextLine = lines[index + 1];

      if (nextLine.trim().startsWith("- ") || countIndent(nextLine) < 2) {
        break;
      }

      index += 1;
      const nestedLine = parseObjectLine(nextLine.trim());

      if (nestedLine) {
        item[nestedLine.key] = nestedLine.value
          ? parseScalar(nestedLine.value)
          : parseFrontmatterLines([]);
      }
    }

    items.push(item);
  }

  return items;
}

function parseFrontmatterLines(lines) {
  const data = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!line.trim() || countIndent(line) > 0) {
      continue;
    }

    const field = parseObjectLine(line);

    if (!field) {
      continue;
    }

    if (field.value) {
      data[field.key] = parseScalar(field.value);
      continue;
    }

    const block = [];

    while (index + 1 < lines.length && countIndent(lines[index + 1]) > 0) {
      index += 1;
      block.push(lines[index].slice(2));
    }

    data[field.key] = block.some((blockLine) => blockLine.trim().startsWith("- "))
      ? parseArrayBlock(block)
      : parseFrontmatterLines(block);
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
    url.startsWith("http:") ||
    url.startsWith("https:") ||
    url.startsWith("mailto:") ||
    url.startsWith("/") ||
    url.startsWith("#")
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
