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
      "Shubha Banerjee | Forward Deployed Backend Engineer",
    );
    expect(document.querySelector('meta[name="description"]')?.content).toBe(
      "Forward deployed backend engineer for AI, data, and operations-heavy products, with 6+ years building Golang services, event platforms, cloud infrastructure, and secure enterprise systems.",
    );
    expect(document.querySelector('meta[name="theme-color"]')?.content).toBe(
      "#201f1d",
    );
  });
});
