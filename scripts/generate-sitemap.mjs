#!/usr/bin/env node
// Generates public/sitemap.xml from markdown content frontmatter.
// Dependency-free; runs automatically via the npm "prebuild" script.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://iamshubha.github.io";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(root, "src", "content");

const collections = [
  { dir: "projects", prefix: "/projects" },
  { dir: "articles", prefix: "/articles" },
  { dir: "labs", prefix: "/labs" }
];

function frontmatterField(raw, key) {
  const match = raw.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : null;
}

function collectUrls() {
  const urls = [{ loc: `${SITE_URL}/`, lastmod: null, priority: "1.0" }];

  for (const { dir, prefix } of collections) {
    let files = [];

    try {
      files = readdirSync(join(contentDir, dir)).filter((f) => f.endsWith(".md"));
    } catch {
      continue;
    }

    for (const file of files) {
      const raw = readFileSync(join(contentDir, dir, file), "utf8");

      if (frontmatterField(raw, "draft") === "true") {
        continue;
      }

      const slug = frontmatterField(raw, "slug") || file.replace(/\.md$/, "");
      const date = frontmatterField(raw, "date");

      urls.push({
        loc: `${SITE_URL}${prefix}/${slug}/`,
        lastmod: date && /^\d{4}-\d{2}-\d{2}/.test(date) ? date.slice(0, 10) : null,
        priority: "0.8"
      });
    }
  }

  return urls;
}

function toXml(urls) {
  const entries = urls
    .map(({ loc, lastmod, priority }) => {
      const lines = [`    <loc>${loc}</loc>`];
      if (lastmod) {
        lines.push(`    <lastmod>${lastmod}</lastmod>`);
      }
      lines.push(`    <priority>${priority}</priority>`);
      return `  <url>\n${lines.join("\n")}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

const urls = collectUrls();
const outPath = join(root, "public", "sitemap.xml");
writeFileSync(outPath, toXml(urls));
console.log(`sitemap.xml generated with ${urls.length} URLs`);
