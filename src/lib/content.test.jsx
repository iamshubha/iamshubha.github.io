import { describe, expect, it } from "vitest";

import {
  findBySlug,
  getPortfolioContent,
  readMarkdownCollection,
  renderMarkdown
} from "./content";

function expectUniqueSlugs(items) {
  const slugs = items.map((item) => item.slug);

  expect(new Set(slugs).size).toBe(slugs.length);
}

function expectDescendingDates(items) {
  const dates = items.map((item) => item.date).filter(Boolean).map(String);
  const sortedDates = [...dates].sort((a, b) => b.localeCompare(a));

  expect(dates).toEqual(sortedDates);
}

describe("portfolio content", () => {
  it("loads required homepage collections", () => {
    const content = getPortfolioContent();

    expect(content.settings.name).toBe("Shubha Banerjee");
    expect(content.resumes.length).toBeGreaterThanOrEqual(3);
    expect(content.services.length).toBeGreaterThanOrEqual(3);
    expect(content.experience.length).toBeGreaterThanOrEqual(4);
    expect(content.skills.length).toBeGreaterThanOrEqual(6);
    expect(Array.isArray(content.testimonials)).toBe(true);
    expect(content.certifications.length).toBeGreaterThanOrEqual(1);
    expect(Array.isArray(content.speaking)).toBe(true);
    expect(content.projects.length).toBeGreaterThanOrEqual(1);
    expect(content.articles.length).toBeGreaterThanOrEqual(1);
    expect(content.labs.length).toBeGreaterThanOrEqual(1);
  });

  it("uses the planned structured content field names", () => {
    const { certifications, resumes, skills } = getPortfolioContent();

    expect(resumes[0]).toEqual(
      expect.objectContaining({
        variantName: expect.any(String),
        fileUrl: expect.any(String),
        description: expect.any(String),
        primaryAudience: expect.any(String),
        lastUpdated: expect.any(String)
      })
    );
    expect(skills[0]).toEqual(
      expect.objectContaining({
        groupName: expect.any(String),
        skills: expect.any(Array),
        priority: expect.any(Number)
      })
    );
    expect(certifications[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        issuer: expect.any(String),
        status: expect.any(String),
        issueDate: expect.any(String),
        credentialUrl: expect.any(String),
        notes: expect.any(String)
      })
    );
  });

  it("finds markdown content by slug", () => {
    const { projects } = getPortfolioContent();

    expect(findBySlug(projects, "governance-platform")?.title).toBe(
      "Decentralized Governance Platform"
    );
    expect(findBySlug(projects, "missing-slug")).toBeNull();
  });

  it("parses markdown frontmatter scalars, arrays, and array objects", () => {
    const [entry] = readMarkdownCollection({
      "../content/projects/custom.md": `---
slug: custom-entry
title: Custom Entry
draft: false
featured: true
stack:
  - React
  - Node
impactMetrics:
  - value: 60%
    label: faster delivery
  - value: $5M+
    label: tracked volume
---

Body content.`
    });

    expect(entry).toEqual(
      expect.objectContaining({
        slug: "custom-entry",
        title: "Custom Entry",
        draft: false,
        featured: true,
        stack: ["React", "Node"],
        impactMetrics: [
          { value: "60%", label: "faster delivery" },
          { value: "$5M+", label: "tracked volume" }
        ],
        body: "Body content."
      })
    );
  });

  it("reuses parsed markdown collections across content reads", () => {
    const first = getPortfolioContent();
    const second = getPortfolioContent();

    expect(second.projects).toBe(first.projects);
    expect(second.articles).toBe(first.articles);
    expect(second.labs).toBe(first.labs);
  });

  it("does not render raw HTML from markdown", () => {
    const html = renderMarkdown("<img src=x onerror=alert(1)>");

    expect(html).not.toContain("<img");
    expect(html).not.toContain("onerror");
  });

  it("does not render unsafe markdown link protocols", () => {
    const javascriptHtml = renderMarkdown("[click](javascript:alert(1))");
    const dataHtml = renderMarkdown("[download](data:text/html;base64,PHNjcmlwdA==)");

    expect(javascriptHtml).not.toContain("<a");
    expect(javascriptHtml).not.toContain("javascript:");
    expect(dataHtml).not.toContain("<a");
    expect(dataHtml).not.toContain("data:");
  });

  it("renders allowed markdown link protocols", () => {
    expect(renderMarkdown("[site](https://example.com)")).toContain(
      '<a href="https://example.com">site</a>'
    );
    expect(renderMarkdown("[mail](mailto:test@example.com)")).toContain(
      '<a href="mailto:test@example.com">mail</a>'
    );
    expect(renderMarkdown("[page](/work)")).toContain('<a href="/work">page</a>');
    expect(renderMarkdown("[section](#top)")).toContain(
      '<a href="#top">section</a>'
    );
  });

  it("does not render unsafe markdown image protocols", () => {
    const javascriptHtml = renderMarkdown("![x](javascript:alert(1))");
    const dataHtml = renderMarkdown("![x](data:text/html;base64,abc)");

    expect(javascriptHtml).not.toContain("<img");
    expect(javascriptHtml).not.toContain("javascript:");
    expect(dataHtml).not.toContain("<img");
    expect(dataHtml).not.toContain("data:");
  });

  it("keeps markdown collection slugs unique", () => {
    const { articles, labs, projects } = getPortfolioContent();

    expectUniqueSlugs(projects);
    expectUniqueSlugs(articles);
    expectUniqueSlugs(labs);
  });

  it("loads project entries with required contract fields", () => {
    const { projects } = getPortfolioContent();

    projects.forEach((project) => {
      expect(project).toEqual(
        expect.objectContaining({
          slug: expect.any(String),
          title: expect.any(String),
          summary: expect.any(String),
          role: expect.any(String),
          stack: expect.any(Array),
          impactMetrics: expect.any(Array)
        })
      );
    });
  });

  it("loads project impact metrics with value and label strings", () => {
    const { projects } = getPortfolioContent();

    projects.forEach((project) => {
      project.impactMetrics.forEach((metric) => {
        expect(metric).toEqual(
          expect.objectContaining({
            value: expect.any(String),
            label: expect.any(String)
          })
        );
      });
    });
  });

  it("loads service entries with CTA labels and URLs", () => {
    const { services } = getPortfolioContent();

    services.forEach((service) => {
      expect(service.cta).toEqual(
        expect.objectContaining({
          label: expect.any(String),
          url: expect.any(String)
        })
      );
    });
  });

  it("resolves all service related project slugs", () => {
    const content = getPortfolioContent();
    const projectSlugs = new Set(content.projects.map((project) => project.slug));

    content.services.forEach((service) => {
      service.relatedProjects.forEach((slug) => {
        expect(projectSlugs.has(slug)).toBe(true);
      });
    });
  });

  it("sorts dated article and lab entries in descending date order", () => {
    const { articles, labs } = getPortfolioContent();

    expectDescendingDates(articles);
    expectDescendingDates(labs);
  });
});
