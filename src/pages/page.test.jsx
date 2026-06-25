import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import App from "../App.jsx";
import FeaturedProjects from "../components/FeaturedProjects.jsx";
import FinalCta from "../components/FinalCta.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import PreviewRail from "../components/PreviewRail.jsx";
import SkillMatrix from "../components/SkillMatrix.jsx";
import { getPortfolioContent } from "../lib/content.js";
import { getHomeNavItems } from "./HomePage.jsx";

function renderRoute(hash = "#/") {
  window.location.hash = hash;
  return render(<App />);
}

afterEach(() => {
  window.location.hash = "";
});

describe("portfolio page routes", () => {
  it("renders the home route with portfolio content", () => {
    renderRoute("#/");

    expect(
      screen.getByRole("heading", { name: "Shubha Banerjee" })
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        name: "Backend Systems for Teams That Need Production Confidence"
      })
    ).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Services" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Featured Projects" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Experience Timeline" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Skill Matrix" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Labs" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Writing" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Public Proof" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Working Style" })).toBeTruthy();
    expect(
      screen.getByText(
        "I am a production-minded backend and cloud engineer who likes clear service boundaries, observable workflows, and systems that can be operated after launch. My work is AI-aware without treating model output as magic, and I am interested in robotics and real-world infrastructure where software has to stay reliable under practical constraints."
      )
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        name: "Build Production Confidence Into the Backend"
      })
    ).toBeTruthy();
    expect(
      screen.getByText(
        "For backend, cloud, automation, or AI-aware systems work, start with a focused project call or send the context by email."
      )
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "Discuss Backend Systems" })).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "Decentralized Governance Platform" })
        .getAttribute("href")
    ).toBe("#/projects/governance-platform");
    expect(
      screen
        .getByRole("link", { name: "Robotics Control Backend Notes" })
        .getAttribute("href")
    ).toBe("#/labs/robotics-control-notes");
    expect(
      screen
        .getByRole("link", { name: "Production AI Backend Integration" })
        .getAttribute("href")
    ).toBe("#/articles/ai-backend-systems");
    expect(screen.queryByRole("heading", { name: "Testimonials" })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Speaking & Open Source" })).toBeNull();
  });

  it("keeps header section navigation on the home route", () => {
    const { unmount } = renderRoute("#/");

    const sectionTargets = {
      Services: "services",
      Work: "work",
      Labs: "labs",
      Writing: "writing",
      Contact: "contact"
    };

    Object.entries(sectionTargets).forEach(([label, id]) => {
      expect(screen.getByRole("link", { name: label }).getAttribute("href")).toBe(
        `#/#${id}`
      );
      expect(document.getElementById(id)).toBeTruthy();
    });

    const navLinks = screen
      .getAllByRole("link")
      .filter((link) => Object.hasOwn(sectionTargets, link.textContent));

    navLinks.forEach((link) => {
      const targetId = link.getAttribute("href").replace("#/#", "");

      expect(document.getElementById(targetId)).toBeTruthy();
    });

    const servicesHref = screen.getByRole("link", { name: "Services" }).getAttribute("href");

    unmount();
    renderRoute(servicesHref);

    expect(window.location.hash).toBe("#/#services");
    expect(screen.queryByRole("heading", { name: "Page not found" })).toBeNull();
    expect(screen.getByRole("heading", { name: "Services" })).toBeTruthy();
  });

  it("computes homepage nav from rendered CMS sections", () => {
    const content = getPortfolioContent();

    expect(getHomeNavItems(content)).toEqual([
      { id: "services", label: "Services" },
      { id: "work", label: "Work" },
      { id: "labs", label: "Labs" },
      { id: "writing", label: "Writing" },
      { id: "contact", label: "Contact" }
    ]);

    expect(
      getHomeNavItems({
        ...content,
        articles: [],
        labs: [],
        projects: [],
        services: []
      })
    ).toEqual([{ id: "contact", label: "Contact" }]);

    expect(
      getHomeNavItems({
        ...content,
        settings: { ...content.settings, finalCta: { title: "Contact", body: "" } }
      })
    ).not.toContainEqual({ id: "contact", label: "Contact" });
  });

  it("renders featured projects with missing facts without throwing", () => {
    render(
      <FeaturedProjects
        projects={[
          {
            slug: "partial-project",
            title: "Partial Project",
            summary: "A featured project with partial CMS data.",
            featured: true,
            impactMetrics: []
          }
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "Partial Project" })).toBeTruthy();
    expect(screen.queryByText("Role")).toBeNull();
    expect(screen.queryByText("Stack")).toBeNull();
  });

  it("renders hero when CTA arrays are missing or incomplete", () => {
    render(
      <Hero
        settings={{
          name: "Shubha Banerjee",
          roleSummary: "Backend and cloud systems engineer",
          heroHeadline: "Backend Systems for Teams That Need Production Confidence",
          heroSubheadline: "CMS data can be partial.",
          primaryCta: { label: "Book a Project Call" },
          featuredMetrics: []
        }}
      />
    );

    expect(screen.getByRole("heading", { name: "Shubha Banerjee" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Book a Project Call" })).toBeNull();
  });

  it("renders final CTA email fallback without scheduling or primary CTA URL", () => {
    render(
      <FinalCta
        settings={{
          email: "hello@example.com",
          finalCta: {
            eyebrow: "Contact",
            title: "Talk Through the Backend",
            body: "Send the project context by email."
          }
        }}
      />
    );

    expect(
      screen.getByRole("heading", { name: "Talk Through the Backend" })
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "hello@example.com" }).getAttribute("href")).toBe(
      "mailto:hello@example.com"
    );
    expect(screen.queryByRole("link", { name: "Book a Project Call" })).toBeNull();
  });

  it("skips skill groups with missing or empty skill arrays", () => {
    render(
      <SkillMatrix
        skills={[
          { groupName: "Missing Skills", priority: 1 },
          { groupName: "Empty Skills", priority: 2, skills: [] },
          { groupName: "Backend", priority: 3, skills: ["Go"] }
        ]}
      />
    );

    expect(screen.getByRole("heading", { name: "Skill Matrix" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Backend" })).toBeTruthy();
    expect(screen.getByText("Go")).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Missing Skills" })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Empty Skills" })).toBeNull();
  });

  it("does not render an undefined footer email link", () => {
    render(<Footer settings={{ name: "Shubha Banerjee", githubUrl: "https://github.com/iamshubha" }} />);

    expect(screen.queryByRole("link", { name: "undefined" })).toBeNull();
    expect(screen.queryByRole("link", { name: "" })).toBeNull();
    expect(screen.queryByText("undefined")).toBeNull();
    expect(screen.getByRole("link", { name: "GitHub" })).toBeTruthy();
  });

  it("omits preview metadata markup when an item has no metadata", () => {
    const { container } = render(
      <PreviewRail
        id="writing"
        title="Writing"
        items={[
          {
            slug: "metadata-free",
            title: "Metadata Free",
            summary: "A preview without category, status, or date."
          }
        ]}
        hrefForItem={(item) => `#/articles/${item.slug}`}
      />
    );

    expect(container.querySelector(".preview-card__meta")).toBeNull();
    expect(screen.getByRole("link", { name: "Metadata Free" })).toBeTruthy();
  });

  it("renders a known project slug", () => {
    renderRoute("#/projects/governance-platform");

    expect(
      screen.getByRole("heading", {
        name: "Decentralized Governance Platform"
      })
    ).toBeTruthy();
  });

  it("renders a known article slug", () => {
    renderRoute("#/articles/ai-backend-systems");

    expect(
      screen.getByRole("heading", {
        name: "Production AI Backend Integration"
      })
    ).toBeTruthy();
  });

  it("renders a known lab slug", () => {
    renderRoute("#/labs/robotics-control-notes");

    expect(
      screen.getByRole("heading", {
        name: "Robotics Control Backend Notes"
      })
    ).toBeTruthy();
  });

  it("renders not found for missing routes", () => {
    renderRoute("#/missing");

    expect(
      screen.getByRole("heading", { name: "Page not found" })
    ).toBeTruthy();
  });

  it("renders not found for missing detail slugs", () => {
    renderRoute("#/projects/missing-slug");

    expect(
      screen.getByRole("heading", { name: "Page not found" })
    ).toBeTruthy();
  });
});
