# Dynamic Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a CMS-managed portfolio site with dynamic homepage content, detail pages, blog, labs, proof collections, scheduling links, rich accessible motion, and GitHub Pages deployment.

**Architecture:** Migrate the source app from Create React App to Vite React while keeping static GitHub Pages deployment. Store portfolio content in repo-managed JSON and Markdown files, expose those files through Decap CMS at `/admin`, and render the public site from typed content loaders.

**Tech Stack:** React 18, Vite, Tailwind CSS, React Router hash routing, Decap CMS, Markdown frontmatter, Vitest, Testing Library, GitHub Pages.

---

## File Structure

Create or replace these source areas:

- `index.html`: Vite root HTML.
- `vite.config.js`: Vite build config with GitHub Pages base.
- `src/main.jsx`: React entry point.
- `src/App.jsx`: Router and page composition.
- `src/styles.css`: Tailwind imports, design tokens, motion, responsive rules.
- `src/content/settings.json`: global site settings, CTAs, SEO, socials, scheduling.
- `src/content/resumes.json`: resume variants.
- `src/content/services.json`: backend, AI, robotics services.
- `src/content/experience.json`: timeline content.
- `src/content/skills.json`: grouped skills.
- `src/content/testimonials.json`: proof quotes.
- `src/content/certifications.json`: credentials.
- `src/content/speaking.json`: public proof and open source.
- `src/content/projects/*.md`: project case studies.
- `src/content/articles/*.md`: blog articles.
- `src/content/labs/*.md`: lab experiments.
- `src/lib/content.js`: content loaders, markdown parsing, sorting, and filtering.
- `src/lib/content.test.jsx`: content loader tests.
- `src/components/*.jsx`: focused presentational sections.
- `src/pages/HomePage.jsx`: homepage assembly.
- `src/pages/ProjectPage.jsx`: project detail page.
- `src/pages/ArticlePage.jsx`: article page.
- `src/pages/LabPage.jsx`: lab detail page.
- `src/pages/NotFoundPage.jsx`: fallback route.
- `public/admin/index.html`: Decap CMS bootstrap.
- `public/admin/config.yml`: Decap CMS collections.
- `public/uploads/.gitkeep`: uploaded CMS media directory.
- `docs/cms.md`: editing and OAuth setup notes.
- `.github/workflows/deploy.yml`: build and publish to GitHub Pages, if repo does not already have a working deploy workflow.

## Task 1: Prepare Vite React Foundation

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `index.html`
- Delete: `public/index.html`
- Replace: `src/index.js` with `src/main.jsx`
- Replace: `src/App.js` with `src/App.jsx`
- Replace: `src/index.css` with `src/styles.css`
- Delete: `src/App.css`
- Delete: `src/components/portfolio.js`
- Delete: `src/reportWebVitals.js`
- Delete: `src/setupTests.js`

- [ ] **Step 1: Install Vite and test dependencies**

Run:

```bash
npm install @vitejs/plugin-react vite vitest jsdom gray-matter marked
npm uninstall react-scripts web-vitals
```

Expected: dependencies update without audit-blocking install failure.

- [ ] **Step 2: Replace scripts in `package.json`**

Use these scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run --environment jsdom",
    "test:watch": "vitest --environment jsdom",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

Keep existing React, React DOM, React Router, Tailwind, lucide, and `gh-pages` dependencies.

- [ ] **Step 3: Create Vite `index.html`**

Create:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#f4f0e8" />
    <title>Shubha Banerjee</title>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create `vite.config.js`**

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

- [ ] **Step 5: Create minimal app shell**

`src/main.jsx`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

`src/App.jsx`:

```jsx
export default function App() {
  return (
    <main id="main">
      <h1>Shubha Banerjee</h1>
    </main>
  );
}
```

- [ ] **Step 6: Create base Tailwind styles**

`src/styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
  --surface: oklch(96% 0.018 88);
  --surface-strong: oklch(99% 0.008 88);
  --ink: oklch(20% 0.035 75);
  --muted: oklch(45% 0.03 75);
  --line: oklch(80% 0.025 80);
  --accent: oklch(62% 0.14 64);
  --accent-ink: oklch(18% 0.04 64);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  font-family: "Aptos", "Segoe UI", sans-serif;
  background: var(--surface);
  color: var(--ink);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  background: var(--surface);
  color: var(--ink);
}

a {
  color: inherit;
}

.skip-link {
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 50;
  transform: translateY(-150%);
  background: var(--ink);
  color: var(--surface);
  padding: 0.75rem 1rem;
}

.skip-link:focus-visible {
  transform: translateY(0);
}

:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 7: Verify Vite build**

Run:

```bash
npm run build
```

Expected: Vite writes `dist/` successfully.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json index.html vite.config.js src public
git commit -m "chore: migrate portfolio to Vite"
```

## Task 2: Add Structured Content And Loaders

**Files:**
- Create: `src/content/settings.json`
- Create: `src/content/resumes.json`
- Create: `src/content/services.json`
- Create: `src/content/experience.json`
- Create: `src/content/skills.json`
- Create: `src/content/testimonials.json`
- Create: `src/content/certifications.json`
- Create: `src/content/speaking.json`
- Create: `src/content/projects/governance-platform.md`
- Create: `src/content/projects/defi-protocol.md`
- Create: `src/content/articles/ai-backend-systems.md`
- Create: `src/content/labs/robotics-control-notes.md`
- Create: `src/lib/content.js`
- Create: `src/lib/content.test.jsx`

- [ ] **Step 1: Add global settings**

Create `src/content/settings.json`:

```json
{
  "name": "Shubha Banerjee",
  "roleSummary": "Backend and cloud systems engineer",
  "heroHeadline": "Backend Systems for Teams That Need Production Confidence",
  "heroSubheadline": "I build cloud-native APIs, automation workflows, and AI-ready backend systems, with an eye toward robotics and real-world infrastructure.",
  "primaryCta": { "label": "Book a Project Call", "url": "https://cal.com/iamshubha" },
  "secondaryCtas": [
    { "label": "Download Resume", "url": "/resumes/backend.pdf" },
    { "label": "Contact Me", "url": "mailto:shubhabanerjeewin8@gmail.com" }
  ],
  "email": "shubhabanerjeewin8@gmail.com",
  "githubUrl": "https://github.com/iamshubha",
  "linkedinUrl": "https://linkedin.com/in/",
  "seoTitle": "Shubha Banerjee | Backend & Cloud Systems Engineer",
  "seoDescription": "Backend, cloud, automation, AI-ready systems, and robotics-adjacent engineering by Shubha Banerjee.",
  "themeColor": "#f4f0e8",
  "featuredMetrics": [
    { "value": "50%", "label": "faster deployments" },
    { "value": "30%", "label": "system efficiency gain" },
    { "value": "25%", "label": "backend performance gain" }
  ],
  "scheduling": {
    "provider": "Cal.com",
    "bookingUrl": "https://cal.com/iamshubha",
    "embedUrl": "",
    "fallbackText": "Email Shubha if the booking link is unavailable."
  }
}
```

- [ ] **Step 2: Add collection seed data**

Create JSON files using existing resume facts. Keep values honest and editable.

`src/content/services.json`:

```json
[
  {
    "title": "Backend & Cloud Systems",
    "summary": "Design, build, and operate APIs, microservices, queues, storage integrations, and cloud deployments.",
    "capabilities": ["Go and Rust services", "Kafka-backed workflows", "S3-compatible storage", "Kubernetes deployments"],
    "proofPoints": ["Improved system efficiency by 30%", "Reduced deployment time by 50%"],
    "relatedProjects": ["governance-platform", "defi-protocol"],
    "cta": { "label": "Book a Project Call", "url": "https://cal.com/iamshubha" }
  },
  {
    "title": "AI-Enabled Engineering",
    "summary": "Add AI workflows where they reduce operational load, improve developer speed, or connect data to action.",
    "capabilities": ["Automation workflows", "AI-assisted internal tools", "Data pipelines", "Backend integration for model outputs"],
    "proofPoints": ["Designed for production integration, not demos"],
    "relatedProjects": [],
    "cta": { "label": "Discuss AI Systems", "url": "mailto:shubhabanerjeewin8@gmail.com" }
  },
  {
    "title": "Robotics-Ready Systems",
    "summary": "Build backend foundations for systems that interact with devices, events, telemetry, and real-world state.",
    "capabilities": ["Telemetry APIs", "Event-driven control surfaces", "Device data ingestion", "Operational dashboards"],
    "proofPoints": ["Focused on reliable software around robotics workflows"],
    "relatedProjects": [],
    "cta": { "label": "Talk Robotics", "url": "mailto:shubhabanerjeewin8@gmail.com" }
  }
]
```

Create `src/content/resumes.json`:

```json
[
  {
    "variantName": "Backend",
    "fileUrl": "/resumes/backend.pdf",
    "description": "Backend and cloud systems resume.",
    "primaryAudience": "Hiring managers and recruiters",
    "lastUpdated": "2026-06-25"
  },
  {
    "variantName": "AI",
    "fileUrl": "/resumes/ai.pdf",
    "description": "AI-enabled backend and automation resume.",
    "primaryAudience": "AI engineering teams and consulting leads",
    "lastUpdated": "2026-06-25"
  },
  {
    "variantName": "Consulting",
    "fileUrl": "/resumes/consulting.pdf",
    "description": "Consulting-focused backend and cloud systems profile.",
    "primaryAudience": "Founders and consulting leads",
    "lastUpdated": "2026-06-25"
  }
]
```

Create `src/content/experience.json` with the Mercedes Benz, HDFC Bank, Logicloop, and CBNITS roles from `README.md`. Use this shape for each item:

```json
{
  "role": "Senior Consultant - Blockchain & Backend",
  "company": "Mercedes Benz",
  "location": "Bangalore",
  "startDate": "2023-10",
  "endDate": "",
  "present": true,
  "summary": "Backend, blockchain, storage, and delivery systems work.",
  "highlights": [
    "Developed scalable microservices using Rust, Go, and Kafka, improving system efficiency by 30%",
    "Implemented secure CI/CD pipelines, reducing deployment time by 50%"
  ],
  "technologies": ["Rust", "Go", "Kafka", "Redis", "CI/CD"],
  "impactMetrics": ["30% system efficiency gain", "50% faster deployments"]
}
```

Create `src/content/skills.json`:

```json
[
  { "groupName": "Backend", "skills": ["Go", "Rust", "TypeScript", "GraphQL", "REST APIs"], "priority": 1 },
  { "groupName": "Cloud & Infrastructure", "skills": ["AWS", "GCP", "Azure", "Docker", "Kubernetes"], "priority": 2 },
  { "groupName": "AI & Automation", "skills": ["Automation workflows", "Data pipelines", "AI tool integration"], "priority": 3 },
  { "groupName": "Robotics-Adjacent Systems", "skills": ["Telemetry APIs", "Event-driven systems", "Device data ingestion"], "priority": 4 },
  { "groupName": "Blockchain", "skills": ["Solidity", "Smart contracts", "Web3.js", "Ethers.js", "IPFS"], "priority": 5 },
  { "groupName": "Security & DevOps", "skills": ["GitHub Actions", "Jenkins", "Grafana", "SonarQube", "Blackduck"], "priority": 6 }
]
```

Create `src/content/testimonials.json`:

```json
[]
```

Create `src/content/certifications.json`:

```json
[
  {
    "name": "AWS Certified Solutions Architect",
    "issuer": "Amazon Web Services",
    "status": "Pursuing",
    "issueDate": "",
    "credentialUrl": "",
    "notes": "Listed as pursuing in existing portfolio content."
  }
]
```

Create `src/content/speaking.json`:

```json
[]
```

- [ ] **Step 3: Add Markdown case studies, article, and lab**

Each Markdown file uses frontmatter plus body:

```md
---
title: "Decentralized Governance Platform"
slug: "governance-platform"
summary: "A decision-making platform with proposal, voting, and consensus workflows."
context: "Blockchain-based platform for transparent decision-making"
role: "Backend and smart-contract engineering"
stack:
  - Rust
  - Smart contracts
  - Off-chain data feeds
impactMetrics:
  - "60% increase in community engagement"
  - "40% faster decision-making"
featured: true
coverImage: ""
links: []
---

## Problem

The platform needed proposal and voting workflows that could support transparent decision-making.

## Work

Built Rust-based smart contract logic, proposal management flows, and off-chain data integration.

## Outcome

The project improved engagement and decision speed based on the available portfolio metrics.
```

- [ ] **Step 4: Implement `src/lib/content.js`**

```js
import matter from "gray-matter";
import { marked } from "marked";
import settings from "../content/settings.json";
import resumes from "../content/resumes.json";
import services from "../content/services.json";
import experience from "../content/experience.json";
import skills from "../content/skills.json";
import testimonials from "../content/testimonials.json";
import certifications from "../content/certifications.json";
import speaking from "../content/speaking.json";

const projectModules = import.meta.glob("../content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const articleModules = import.meta.glob("../content/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const labModules = import.meta.glob("../content/labs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function readMarkdownCollection(modules) {
  return Object.values(modules)
    .map((raw) => {
      const parsed = matter(raw);
      return {
        ...parsed.data,
        body: parsed.content,
        html: marked.parse(parsed.content),
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
    labs: readMarkdownCollection(labModules),
  };
}

export function findBySlug(items, slug) {
  return items.find((item) => item.slug === slug) || null;
}
```

- [ ] **Step 5: Add content loader tests**

`src/lib/content.test.jsx`:

```jsx
import { describe, expect, it } from "vitest";
import { findBySlug, getPortfolioContent } from "./content";

describe("portfolio content", () => {
  it("loads required homepage collections", () => {
    const content = getPortfolioContent();
    expect(content.settings.name).toBe("Shubha Banerjee");
    expect(content.services.length).toBeGreaterThanOrEqual(3);
    expect(content.projects.length).toBeGreaterThanOrEqual(1);
    expect(content.articles.length).toBeGreaterThanOrEqual(1);
    expect(content.labs.length).toBeGreaterThanOrEqual(1);
  });

  it("finds markdown entries by slug", () => {
    const content = getPortfolioContent();
    expect(findBySlug(content.projects, "governance-platform")?.title).toBe("Decentralized Governance Platform");
    expect(findBySlug(content.projects, "missing")).toBeNull();
  });
});
```

- [ ] **Step 6: Verify tests**

Run:

```bash
npm test
```

Expected: content loader tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/content src/lib
git commit -m "feat: add portfolio content model"
```

## Task 3: Build Routing And Detail Pages

**Files:**
- Modify: `src/App.jsx`
- Create: `src/pages/HomePage.jsx`
- Create: `src/pages/ProjectPage.jsx`
- Create: `src/pages/ArticlePage.jsx`
- Create: `src/pages/LabPage.jsx`
- Create: `src/pages/NotFoundPage.jsx`
- Create: `src/pages/page.test.jsx`

- [ ] **Step 1: Add hash routing**

`src/App.jsx`:

```jsx
import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import ArticlePage from "./pages/ArticlePage";
import LabPage from "./pages/LabPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/labs/:slug" element={<LabPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}
```

- [ ] **Step 2: Create detail page pattern**

Each detail page should load `getPortfolioContent()`, use `useParams()`, call `findBySlug()`, render not found for missing slugs, and render body HTML with `dangerouslySetInnerHTML` only for trusted repo content.

Example `src/pages/ProjectPage.jsx`:

```jsx
import { Link, useParams } from "react-router-dom";
import { findBySlug, getPortfolioContent } from "../lib/content";
import NotFoundPage from "./NotFoundPage";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = findBySlug(getPortfolioContent().projects, slug);

  if (!project) return <NotFoundPage />;

  return (
    <main id="main" className="detail-page">
      <Link to="/" className="back-link">Back to Home</Link>
      <p className="eyebrow">Case Study</p>
      <h1>{project.title}</h1>
      <p className="lede">{project.summary}</p>
      <dl className="detail-facts">
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Stack</dt><dd>{project.stack?.join(", ")}</dd></div>
      </dl>
      <article className="prose" dangerouslySetInnerHTML={{ __html: project.html }} />
    </main>
  );
}
```

- [ ] **Step 3: Add page tests**

Test that known slugs render titles and missing slugs render the not-found message.

- [ ] **Step 4: Verify**

Run:

```bash
npm test
npm run build
```

Expected: tests and production build pass.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/pages
git commit -m "feat: add portfolio routes"
```

## Task 4: Build Homepage Sections

**Files:**
- Modify: `src/pages/HomePage.jsx`
- Create: `src/components/Header.jsx`
- Create: `src/components/Hero.jsx`
- Create: `src/components/ProofStrip.jsx`
- Create: `src/components/Services.jsx`
- Create: `src/components/FeaturedProjects.jsx`
- Create: `src/components/ExperienceTimeline.jsx`
- Create: `src/components/SkillMatrix.jsx`
- Create: `src/components/PreviewRail.jsx`
- Create: `src/components/Testimonials.jsx`
- Create: `src/components/PublicProof.jsx`
- Create: `src/components/AboutSection.jsx`
- Create: `src/components/FinalCta.jsx`
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Assemble homepage from content**

`HomePage.jsx` should call `getPortfolioContent()` once and pass data to sections.

- [ ] **Step 2: Implement CTAs correctly**

Use `<a>` for all navigation/contact/scheduling links. The hero primary link uses `settings.primaryCta`. Secondary links render from `settings.secondaryCtas`.

- [ ] **Step 3: Add empty states**

Each collection section should render nothing or a concise empty state when its array is empty. Do not render broken headings with no content.

- [ ] **Step 4: Add accessible section markup**

Each major section uses a semantic `<section aria-labelledby="...">` and an in-order heading.

- [ ] **Step 5: Verify**

Run:

```bash
npm test
npm run build
```

Expected: build passes and homepage contains CMS data.

- [ ] **Step 6: Commit**

```bash
git add src/pages/HomePage.jsx src/components
git commit -m "feat: build dynamic portfolio homepage"
```

## Task 5: Apply Visual System And Motion

**Files:**
- Modify: `src/styles.css`
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/FeaturedProjects.jsx`
- Modify: `src/components/PreviewRail.jsx`
- Modify: `src/components/Services.jsx`

- [ ] **Step 1: Add layout and typography classes**

Define reusable classes for `.site-shell`, `.section`, `.section-heading`, `.eyebrow`, `.lede`, `.button`, `.button-secondary`, `.metric-grid`, `.case-grid`, and `.detail-page`.

- [ ] **Step 2: Add purposeful motion**

Use `transform` and `opacity` only. Add hero stagger and card hover/focus effects. Do not use `transition: all`.

- [ ] **Step 3: Add reduced motion behavior**

Keep the global `prefers-reduced-motion` block and verify animated elements remain readable without animation.

- [ ] **Step 4: Verify CSS anti-patterns**

Run:

```bash
rg "transition:\\s*all|outline:\\s*none|background-clip:\\s*text|border-left:\\s*[2-9]" src
```

Expected: no matches.

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "feat: add portfolio visual system"
```

## Task 6: Add Decap CMS

**Files:**
- Create: `public/admin/index.html`
- Create: `public/admin/config.yml`
- Create: `public/uploads/.gitkeep`
- Create: `docs/cms.md`

- [ ] **Step 1: Add Decap admin page**

`public/admin/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio Content Admin</title>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.6.0/dist/decap-cms.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Add CMS config**

`public/admin/config.yml` must define:

- GitHub backend for `iamshubha/iamshubha.github.io`
- `master` branch
- media folder `public/uploads`
- public folder `/uploads`
- collections for settings, resumes, services, projects, experience, skills, articles, labs, testimonials, certifications, speaking, scheduling.

- [ ] **Step 3: Document setup**

`docs/cms.md` must include these exact sections:

- `Access`: Open `/admin` on the deployed site.
- `Authentication`: Authenticate through the configured GitHub-backed Decap CMS backend.
- `Publishing`: Content saves create commits on `master`; deployment publishes the build.
- `Media`: Resume PDFs and images belong in `public/uploads`.
- `Scheduling`: Scheduling uses the external booking URL or embed configured in Site Settings.
- `Local editing fallback`: Edit files in `src/content` directly if the CMS OAuth integration is unavailable.

- [ ] **Step 4: Verify admin files are included in build**

Run:

```bash
npm run build
test -f dist/admin/index.html
test -f dist/admin/config.yml
```

Expected: both files exist in `dist/admin`.

- [ ] **Step 5: Commit**

```bash
git add public/admin public/uploads docs/cms.md
git commit -m "feat: add Decap CMS"
```

## Task 7: Add Deployment Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `package.json`

- [ ] **Step 1: Add GitHub Pages workflow**

Create a workflow that runs on pushes to `master`, installs dependencies with `npm ci`, runs tests, builds, and deploys `dist` to GitHub Pages.

- [ ] **Step 2: Verify locally**

Run:

```bash
npm ci
npm test
npm run build
```

Expected: clean install, tests pass, build passes.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml package.json package-lock.json
git commit -m "ci: deploy portfolio to GitHub Pages"
```

## Task 8: Final Audit

**Files:**
- Modify: files with concrete audit findings from Step 2 or browser checks from Step 3.

- [ ] **Step 1: Run full verification**

```bash
npm test
npm run build
```

Expected: both pass.

- [ ] **Step 2: Run guideline scan**

```bash
rg "transition:\\s*all|outline:\\s*none|onClick=|user-scalable=no|maximum-scale=1|background-clip:\\s*text|border-left:\\s*[2-9]" src public
```

Expected: no problematic matches. If `onClick=` appears only in non-interactive tests, document why or remove it.

- [ ] **Step 3: Manual browser checks**

Run:

```bash
npm run dev
```

Check:

- Homepage loads.
- `/admin` loads.
- `#/projects/governance-platform` loads.
- `#/articles/ai-backend-systems` loads.
- `#/labs/robotics-control-notes` loads.
- Header and hero CTAs work.
- Keyboard tab order is visible.
- Mobile viewport has no horizontal overflow.
- Reduced motion mode remains usable.

- [ ] **Step 4: Commit fixes**

```bash
git add .
git commit -m "fix: complete portfolio audit"
```

## Self-Review

Spec coverage:

- CMS-managed homepage: Tasks 2, 4, 6.
- Decap CMS with GitHub commits: Task 6.
- Editable resume, CTAs, services, projects, experience, skills, SEO, social links: Tasks 2 and 6.
- Case-study structure: Tasks 2 and 3.
- GitHub Pages deployment: Tasks 1 and 7.
- Blog/articles: Tasks 2, 3, and 6.
- Labs: Tasks 2, 3, and 6.
- Testimonials/proof, certifications, speaking/open source: Tasks 2, 4, and 6.
- Project detail pages: Task 3.
- Multiple resume variants: Tasks 2 and 6.
- Live scheduling integration: Tasks 2, 4, and 6 via external URL/embed.
- Complex purposeful animations: Task 5.
- Accessibility and web interface guidelines: Tasks 5 and 8.

Placeholder scan: no task contains deferred implementation markers. The CMS config task defines required collections and field names from the spec; execution must encode those names directly in YAML.

Type consistency: loader functions are `getPortfolioContent()` and `findBySlug(items, slug)` throughout the plan.
