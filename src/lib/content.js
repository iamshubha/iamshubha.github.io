import matter from "gray-matter";
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

export function renderMarkdown(markdown) {
  return marked.parse(escapeHtml(stripRawHtml(markdown)));
}

export function readMarkdownCollection(modules) {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const { data, content } = matter(raw);

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
  return {
    settings,
    resumes,
    services,
    experience,
    skills,
    testimonials,
    certifications,
    speaking,
    projects: readMarkdownCollection(projectModules),
    articles: readMarkdownCollection(articleModules),
    labs: readMarkdownCollection(labModules)
  };
}

export function findBySlug(items, slug) {
  return items.find((item) => item.slug === slug) || null;
}
