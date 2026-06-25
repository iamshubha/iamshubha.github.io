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
