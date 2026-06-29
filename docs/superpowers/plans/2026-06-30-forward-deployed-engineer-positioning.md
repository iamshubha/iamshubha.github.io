# Forward Deployed Engineer Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the live portfolio for Forward Deployed Engineer roles while keeping claims factual and resume-backed.

**Architecture:** This is a content-first update using the existing Decap CMS content model. The implementation modifies JSON and Markdown content, keeps the current React components and visual system, updates tests that assert content, and deploys through the existing GitHub Pages workflow.

**Tech Stack:** Vite, React, React Router, Decap CMS content files, Markdown frontmatter, Vitest, GitHub Pages Actions.

---

### Task 1: Update Homepage Positioning

**Files:**
- Modify: `src/content/settings.json`
- Test: `src/App.test.jsx`
- Test: `src/pages/page.test.jsx`

- [ ] **Step 1: Update `src/content/settings.json` hero and CTA fields**

Set:

```json
{
  "roleSummary": "Forward Deployed Engineer | Golang | Cloud-native systems",
  "heroHeadline": "Forward deployed backend engineer for AI, data, and operations-heavy products.",
  "heroSubheadline": "I work close to users and delivery teams to turn messy workflows into production Go services, event-driven platforms, and secure cloud infrastructure.",
  "primaryCta": {
    "label": "Talk Through a Deployment Problem",
    "url": "mailto:shubhabanerjeewin8@gmail.com"
  },
  "secondaryCtas": [
    {
      "label": "Download Resume",
      "url": "/uploads/backend.pdf"
    },
    {
      "label": "View Implementation Proof",
      "url": "#work"
    }
  ],
  "seoTitle": "Shubha Banerjee | Forward Deployed Backend Engineer",
  "seoDescription": "Forward deployed backend engineer for AI, data, and operations-heavy products, with 6+ years building Golang services, event platforms, cloud infrastructure, and secure enterprise systems.",
  "themeColor": "#201f1d"
}
```

Keep existing `name`, `email`, `githubUrl`, `linkedinUrl`, and `scheduling` values.

- [ ] **Step 2: Update proof metrics in `src/content/settings.json`**

Set:

```json
"featuredMetrics": [
  {
    "value": "6+",
    "label": "years shipping production backend systems"
  },
  {
    "value": "8",
    "label": "engineers led on distributed delivery"
  },
  {
    "value": "Enterprise",
    "label": "warehouse, manufacturing, banking, healthcare"
  }
]
```

- [ ] **Step 3: Update About and Final CTA in `src/content/settings.json`**

Set:

```json
"about": {
  "eyebrow": "About",
  "title": "I turn ambiguous operational problems into shipped backend systems.",
  "body": "I am a backend engineer with 6+ years of experience building Golang services, event-driven platforms, and secure cloud infrastructure for enterprise systems. My strongest work sits where forward deployed engineering sits: understanding messy workflows, shaping the backend path, and shipping reliable systems with delivery teams.",
  "bullets": [
    "Translate operational workflows into service boundaries, APIs, queues, and deployment plans",
    "Build Go services across Kafka, Google Pub/Sub, Azure Service Bus, Redis, PostgreSQL, and gRPC",
    "Deploy and operate systems with Kubernetes, Docker, Terraform, GitHub Actions, BlackDuck, and SonarQube",
    "Comfortable in warehouse, manufacturing, banking, healthcare, compliance, and document-processing domains"
  ]
},
"finalCta": {
  "eyebrow": "Contact",
  "title": "Have an ambiguous deployment problem?",
  "body": "Send the workflow, system context, or role brief. I can talk through how I would discover the problem, design the backend path, and ship the first reliable version."
}
```

- [ ] **Step 4: Update tests for new homepage copy**

In `src/App.test.jsx`, assert:

```js
expect(document.title).toBe("Shubha Banerjee | Forward Deployed Backend Engineer");
expect(document.querySelector('meta[name="description"]')?.content).toBe(
  "Forward deployed backend engineer for AI, data, and operations-heavy products, with 6+ years building Golang services, event platforms, cloud infrastructure, and secure enterprise systems.",
);
```

In `src/pages/page.test.jsx`, replace homepage heading/body expectations with the new hero headline, about heading/body, and final CTA heading/body.

- [ ] **Step 5: Run tests**

Run:

```bash
npm test
```

Expected: all tests pass after assertions are updated.

- [ ] **Step 6: Commit**

```bash
git add src/content/settings.json src/App.test.jsx src/pages/page.test.jsx
git commit -m "feat: position homepage for FDE roles"
```

### Task 2: Update Services And Skills For FDE Execution

**Files:**
- Modify: `src/content/services.json`
- Modify: `src/content/skills.json`
- Test: `src/pages/page.test.jsx`

- [ ] **Step 1: Replace `src/content/services.json` with FDE service cards**

Use three services:

```json
{
  "items": [
    {
      "slug": "workflow-to-deployment",
      "title": "Turn messy workflows into deployed systems",
      "summary": "I work from operational context to backend design: clarify the workflow, identify service boundaries, and ship the first reliable version.",
      "capabilities": [
        "Workflow discovery with users and delivery teams",
        "Service boundary and API planning",
        "Implementation plans for ambiguous systems",
        "Operational rollout thinking"
      ],
      "proofPoints": [
        "Supported warehouse management workflows at IKEA",
        "Built platforms across healthcare, compliance, and document verification"
      ],
      "cta": {
        "label": "Send a Workflow Problem",
        "url": "mailto:shubhabanerjeewin8@gmail.com"
      },
      "relatedProjects": [
        "fikrabot-document-verification",
        "medzimi-healthcare-platform"
      ]
    },
    {
      "slug": "backend-event-platforms",
      "title": "Build production backend and event platforms",
      "summary": "I build Go services, gRPC APIs, message routing, and event-driven workflows for systems that need to move data reliably.",
      "capabilities": [
        "Golang services",
        "gRPC and REST APIs",
        "Kafka, Google Pub/Sub, and Azure Service Bus",
        "PostgreSQL, Redis, and Aerospike"
      ],
      "proofPoints": [
        "Built services processing terabytes of manufacturing data weekly",
        "Designed event-driven microservices across heterogeneous messaging systems"
      ],
      "cta": {
        "label": "Discuss Event Platforms",
        "url": "mailto:shubhabanerjeewin8@gmail.com"
      },
      "relatedProjects": []
    },
    {
      "slug": "secure-operable-delivery",
      "title": "Make delivery secure and operable",
      "summary": "I help teams ship backend systems with deployment automation, vulnerability scanning, compliance remediation, and observability in the loop.",
      "capabilities": [
        "Kubernetes, Docker, and Terraform",
        "GitHub Actions and CI/CD pipelines",
        "BlackDuck and SonarQube scanning",
        "Grafana and operational visibility"
      ],
      "proofPoints": [
        "Achieved zero open compliance issues in enterprise delivery",
        "Reduced security incidents by 30% through audits and vulnerability reviews"
      ],
      "cta": {
        "label": "Review Delivery Risk",
        "url": "mailto:shubhabanerjeewin8@gmail.com"
      },
      "relatedProjects": []
    }
  ]
}
```

- [ ] **Step 2: Replace `src/content/skills.json` with FDE modes**

Use groups:

```json
{
  "items": [
    {
      "groupName": "Discover & Shape",
      "skills": ["Workflow mapping", "Technical discovery", "Implementation planning", "Delivery leadership", "Code reviews", "Sprint planning"],
      "priority": 1
    },
    {
      "groupName": "Build",
      "skills": ["Golang", "gRPC", "REST APIs", "Microservices", "PostgreSQL", "Redis", "Aerospike", "Gin"],
      "priority": 2
    },
    {
      "groupName": "Connect",
      "skills": ["Apache Kafka", "Google Pub/Sub", "Azure Service Bus", "Message routing", "Event-driven architecture", "Real-time processing"],
      "priority": 3
    },
    {
      "groupName": "Deploy",
      "skills": ["Kubernetes", "Docker", "Terraform", "GitHub Actions", "AWS", "GCP", "Azure", "CI/CD"],
      "priority": 4
    },
    {
      "groupName": "Operate & Secure",
      "skills": ["BlackDuck", "SonarQube", "Grafana", "Observability", "Compliance remediation", "Vulnerability reviews", "Security audits"],
      "priority": 5
    }
  ]
}
```

- [ ] **Step 3: Update tests**

In `src/pages/page.test.jsx`, assert the homepage has the service CTA `Send a Workflow Problem` and the skill heading `Discover & Shape`.

- [ ] **Step 4: Run tests**

Run:

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/content/services.json src/content/skills.json src/pages/page.test.jsx
git commit -m "feat: align services and skills to FDE work"
```

### Task 3: Reframe Case Studies, Writing, And Labs

**Files:**
- Modify: `src/content/projects/fikrabot-document-verification.md`
- Modify: `src/content/projects/medzimi-healthcare-platform.md`
- Modify: `src/content/articles/secure-golang-delivery.md`
- Modify: `src/content/labs/event-driven-warehouse-messaging.md`
- Test: `src/pages/page.test.jsx`

- [ ] **Step 1: Reframe project summaries**

For Fikrabot, set summary:

```yaml
summary: Forward-deployed implementation proof: turned compliance document workflows into extraction, validation, anomaly detection, and fraud-oriented backend pipelines.
```

For Medzimi, set summary:

```yaml
summary: Forward-deployed implementation proof: translated multi-participant healthcare workflows into platform services, search infrastructure, and extensible backend foundations.
```

Keep existing slugs.

- [ ] **Step 2: Rework project body text**

Fikrabot body should include:

```markdown
The forward deployed work was understanding the operational workflow first: what documents had to be checked, where validation failed, and how teams could trust the result.

I worked on backend services and multi-stage pipelines that extracted, compared, and validated information across invoices, permits, shipment documents, and related records. The value was not a single feature; it was turning a compliance workflow into a system with clear states, repeatable validation, and reviewable output.
```

Medzimi body should include:

```markdown
The forward deployed problem was coordination: patients, doctors, pharmacies, and laboratories each needed different workflows, but the backend had to keep the platform coherent.

I worked on backend services, search infrastructure, and architecture foundations that could support multiple healthcare journeys. The implementation emphasized extensibility, reliable service boundaries, and AI-assisted document and recommendation workflows where they fit the operational need.
```

- [ ] **Step 3: Rename article and lab titles**

Article frontmatter:

```yaml
title: How I Approach Forward Deployed Backend Work
summary: A practical note on taking ambiguous workflows and turning them into production Go services, event platforms, and secure delivery paths.
category: Forward Deployed Engineering
```

Lab frontmatter:

```yaml
title: Event-Driven Implementation Notes for Operations Platforms
summary: Notes on implementing operations-heavy backend systems across Pub/Sub, Azure Service Bus, Kafka, validation pipelines, and service coordination.
category: Implementation Notes
```

- [ ] **Step 4: Update tests**

In `src/pages/page.test.jsx`, update known article and lab heading expectations to:
- `How I Approach Forward Deployed Backend Work`
- `Event-Driven Implementation Notes for Operations Platforms`

- [ ] **Step 5: Run tests and build**

Run:

```bash
npm test
npm run build
```

Expected: tests pass and build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/content/projects src/content/articles src/content/labs src/pages/page.test.jsx public/sitemap.xml
git commit -m "feat: reframe case studies for FDE proof"
```

### Task 4: Final Verification And Deploy

**Files:**
- No content file changes expected unless verification finds stale copy.

- [ ] **Step 1: Scan stale positioning terms**

Run:

```bash
rg "Decentralized|DeFi|robotics-ready|Large-scale backend systems, event platforms|Senior Backend Engineer \\| Golang" src/content src public/sitemap.xml
```

Expected: no matches for stale primary positioning. If matches are in tests only, update tests. If matches are in public content, rewrite content.

- [ ] **Step 2: Run full verification**

Run:

```bash
npm test
npm run build
```

Expected: tests and build pass.

- [ ] **Step 3: Push to GitHub Pages**

Run:

```bash
git push origin master
gh run list --workflow "Deploy to GitHub Pages" --limit 3
gh run watch <new-run-id> --exit-status
```

Expected: GitHub Pages deploy completes successfully.

- [ ] **Step 4: Verify live deployment**

Run:

```bash
curl -I https://iamshubha.github.io/
curl -I https://iamshubha.github.io/uploads/backend.pdf
```

Expected: both return `200`.

Check the deployed JS bundle:

```bash
asset=$(curl -fsSL https://iamshubha.github.io/ | sed -n 's/.*src="\([^"]*index-[^"]*\.js\)".*/\1/p')
curl -fsSL "https://iamshubha.github.io${asset}" | rg "Forward deployed backend engineer|Talk Through a Deployment Problem|How I Approach Forward Deployed Backend Work"
```

Expected: all new FDE copy appears.

---

## Self-Review

Spec coverage:
- Hero, proof strip, services, projects, experience-adjacent proof, skills, writing/labs, final CTA, factuality constraints, tests, and deployment are covered.

Placeholder scan:
- No `TBD`, `TODO`, or ambiguous implementation placeholders remain.

Scope:
- This is a single focused content repositioning update. No new CMS collections or broad visual redesign are included.

