import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import App from "../App.jsx";

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
