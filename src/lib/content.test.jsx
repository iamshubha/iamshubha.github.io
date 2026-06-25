import { describe, expect, it } from "vitest";

import { findBySlug, getPortfolioContent } from "./content";

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

  it("finds markdown content by slug", () => {
    const { projects } = getPortfolioContent();

    expect(findBySlug(projects, "governance-platform")?.title).toBe(
      "Decentralized Governance Platform"
    );
    expect(findBySlug(projects, "missing-slug")).toBeNull();
  });
});
