import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";

import App from "../App.jsx";
import FeaturedProjects from "../components/FeaturedProjects.jsx";
import FinalCta from "../components/FinalCta.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import PreviewRail from "../components/PreviewRail.jsx";
import RoleFit from "../components/RoleFit.jsx";
import SkillMatrix from "../components/SkillMatrix.jsx";
import { getPortfolioContent } from "../lib/content.js";
import { getHomeNavItems } from "./HomePage.jsx";

function renderRoute(path = "/") {
  window.history.pushState({}, "", path);
  return render(<App />);
}

afterEach(() => {
  window.history.pushState({}, "", "/");
});

describe("portfolio page routes", () => {
  it("renders the home route with portfolio content", () => {
    renderRoute("/");

    expect(
      screen.getByRole("heading", { name: "Shubha Banerjee" })
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        name: "Forward deployed backend engineer for AI, data, and operations-heavy products."
      })
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        name: "Why I fit forward deployed and AI-native engineering roles"
      })
    ).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Services" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Featured Projects" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Experience Timeline" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Skill Matrix" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Labs" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Writing" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Public Proof" })).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        name: "I turn ambiguous operational problems into shipped backend systems."
      })
    ).toBeTruthy();
    expect(
      screen.getByText(
        "I am a backend engineer with 6+ years of experience building Golang services, event-driven platforms, and secure cloud infrastructure for enterprise systems. My strongest work sits where forward deployed engineering sits: understanding messy workflows, shaping the backend path, and shipping reliable systems with delivery teams."
      )
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        name: "Have an ambiguous deployment problem?"
      })
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Send the workflow, system context, or role brief. I can talk through how I would discover the problem, design the backend path, and ship the first reliable version."
      )
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "Send a Workflow Problem" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Discover & Shape" })).toBeTruthy();
    expect(
      screen.getAllByRole("link", { name: "Talk Through a Deployment Problem" }).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("link", { name: "View Implementation Proof" }).getAttribute("href")
    ).toBe("#work");
    expect(
      screen
        .getByRole("link", { name: "Fikrabot - Intelligent Document Verification Platform" })
        .getAttribute("href")
    ).toBe("/projects/fikrabot-document-verification/");
    expect(
      screen
        .getByRole("link", { name: "Event-Driven Implementation Notes for Operations Platforms" })
        .getAttribute("href")
    ).toBe("/labs/event-driven-warehouse-messaging/");
    expect(
      screen
        .getByRole("link", { name: "How I Approach Forward Deployed Backend Work" })
        .getAttribute("href")
    ).toBe("/articles/secure-golang-delivery/");
    expect(screen.queryByRole("heading", { name: "Testimonials" })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Speaking & Open Source" })).toBeNull();
  });

  it("keeps header section navigation on the home route", () => {
    renderRoute("/");

    const sectionTargets = {
      Fit: "fit",
      Services: "services",
      Work: "work",
      Labs: "labs",
      Writing: "writing",
      Contact: "contact"
    };

    Object.entries(sectionTargets).forEach(([label, id]) => {
      expect(screen.getByRole("link", { name: label }).getAttribute("href")).toBe(
        `#${id}`
      );
      expect(document.getElementById(id)).toBeTruthy();
    });

    const navLinks = screen
      .getAllByRole("link")
      .filter((link) => Object.hasOwn(sectionTargets, link.textContent));

    navLinks.forEach((link) => {
      const targetId = link.getAttribute("href").replace("#", "");

      expect(document.getElementById(targetId)).toBeTruthy();
    });
  });

  it("renders the home route directly at a clean deep link", () => {
    renderRoute("/projects/fikrabot-document-verification");

    expect(screen.queryByRole("heading", { name: "Page not found" })).toBeNull();
    expect(
      screen.getByRole("heading", {
        name: "Fikrabot - Intelligent Document Verification Platform"
      })
    ).toBeTruthy();
  });

  it("computes homepage nav from rendered CMS sections", () => {
    const content = getPortfolioContent();

    expect(getHomeNavItems(content)).toEqual([
      { id: "fit", label: "Fit" },
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
    ).toEqual([
      { id: "fit", label: "Fit" },
      { id: "contact", label: "Contact" }
    ]);

    expect(
      getHomeNavItems({
        ...content,
        settings: { ...content.settings, finalCta: { title: "Contact", body: "" } }
      })
    ).not.toContainEqual({ id: "contact", label: "Contact" });
  });

  it("renders featured projects with missing facts without throwing", () => {
    render(
      <MemoryRouter>
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
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Partial Project" })).toBeTruthy();
    expect(screen.queryByText("Role")).toBeNull();
    expect(screen.queryByText("Stack")).toBeNull();
  });

  it("renders no role fit section when CMS data is incomplete", () => {
    render(<RoleFit roleFit={{ title: "Hiring Fit", signals: [] }} />);

    expect(screen.queryByRole("heading", { name: "Hiring Fit" })).toBeNull();
  });

  it("renders hero when CTA arrays are missing or incomplete", () => {
    render(
      <Hero
        settings={{
          name: "Shubha Banerjee",
          roleSummary: "Backend and cloud systems engineer",
          heroHeadline: "Forward deployed backend engineer for AI, data, and operations-heavy products.",
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
      <MemoryRouter>
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
          hrefForItem={(item) => `/articles/${item.slug}`}
        />
      </MemoryRouter>
    );

    expect(container.querySelector(".preview-card__meta")).toBeNull();
    expect(screen.getByRole("link", { name: "Metadata Free" })).toBeTruthy();
  });

  it("renders a known project slug", () => {
    renderRoute("/projects/fikrabot-document-verification");

    expect(
      screen.getByRole("heading", {
        name: "Fikrabot - Intelligent Document Verification Platform"
      })
    ).toBeTruthy();
  });

  it("renders a known article slug", () => {
    renderRoute("/articles/secure-golang-delivery");

    expect(
      screen.getByRole("heading", {
        name: "How I Approach Forward Deployed Backend Work"
      })
    ).toBeTruthy();
  });

  it("renders the AI-native engineer article slug", () => {
    renderRoute("/articles/ai-native-forward-deployed-engineer");

    expect(
      screen.getByRole("heading", {
        name: "AI-Native Forward Deployed Engineering"
      })
    ).toBeTruthy();
  });

  it("renders a known lab slug", () => {
    renderRoute("/labs/event-driven-warehouse-messaging");

    expect(
      screen.getByRole("heading", {
        name: "Event-Driven Implementation Notes for Operations Platforms"
      })
    ).toBeTruthy();
  });

  it("renders not found for missing routes", () => {
    renderRoute("/missing");

    expect(
      screen.getByRole("heading", { name: "Page not found" })
    ).toBeTruthy();
  });

  it("renders not found for missing detail slugs", () => {
    renderRoute("/projects/missing-slug");

    expect(
      screen.getByRole("heading", { name: "Page not found" })
    ).toBeTruthy();
  });
});
