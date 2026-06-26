import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App.jsx";

describe("App", () => {
  afterEach(() => {
    document.head.innerHTML = "";
    document.title = "";
  });

  it("renders the portfolio heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Shubha Banerjee" }),
    ).toBeTruthy();
  });

  it("applies CMS SEO settings to document metadata", () => {
    render(<App />);

    expect(document.title).toBe(
      "Shubha Banerjee | Backend & Cloud Systems Engineer",
    );
    expect(document.querySelector('meta[name="description"]')?.content).toBe(
      "Backend, cloud, automation, AI-ready systems, and robotics-adjacent engineering by Shubha Banerjee.",
    );
    expect(document.querySelector('meta[name="theme-color"]')?.content).toBe(
      "#f4f0e8",
    );
  });
});
