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
      "Shubha Banerjee | Senior Backend Engineer | Golang",
    );
    expect(document.querySelector('meta[name="description"]')?.content).toBe(
      "Senior Backend Engineer with 6+ years of experience in Golang, microservices, Kafka, Redis, Kubernetes, Terraform, PostgreSQL, cloud infrastructure, and secure backend systems.",
    );
    expect(document.querySelector('meta[name="theme-color"]')?.content).toBe(
      "#201f1d",
    );
  });
});
