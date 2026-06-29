# Forward Deployed Engineer Portfolio Positioning Design

Date: 2026-06-30

## Goal

Reposition the portfolio for Forward Deployed Engineer roles, especially roles that sit between applied AI/product implementation and enterprise backend/cloud delivery.

The site should no longer read only as a senior backend resume. It should read as a candidate who can embed with product, customer, and operations teams; understand ambiguous workflows; build reliable production systems; and communicate implementation tradeoffs clearly.

## Target Audience

Primary audience:
- Applied AI and product implementation teams hiring Forward Deployed Engineers.
- Enterprise/platform teams hiring customer-facing backend or implementation engineers.
- Recruiters and engineering managers who need quick proof that Shubha can handle real production deployments.

Secondary audience:
- Founders or technical leaders looking for backend/cloud consulting help.
- Teams with operations-heavy software problems in manufacturing, warehousing, banking, healthcare, compliance, or document workflows.

## Positioning

Primary positioning:

> Forward deployed backend engineer for AI, data, and operations-heavy products.

Supporting message:

> I work close to users and delivery teams to turn messy workflows into production Go services, event-driven platforms, and secure cloud infrastructure.

This positioning intentionally leads with Forward Deployed Engineer language, then proves it with the existing resume facts:
- IKEA warehouse platform and distributed service work.
- Mercedes-Benz manufacturing data, Kafka, gRPC, and compliance delivery.
- HDFC debit-card services, reliability, and security reviews.
- Fikrabot and Medzimi product/platform case studies.
- Golang, event systems, Kubernetes, Terraform, security scanning, and observability.

## Research Basis

Current FDE role descriptions consistently emphasize:
- Customer-embedded or user-close implementation work.
- Owning ambiguous problems through production deployment.
- Building prototypes and production systems quickly.
- Combining product judgment, technical depth, and communication.
- Turning repeat customer workflows into reusable technical patterns.

Reference sources used for role-market language:
- Palantir careers and Forward Deployed Software Engineer role pages: https://www.palantir.com/careers/
- OpenAI careers and Forward Deployed Engineer listings: https://openai.com/careers/
- Anthropic careers and applied AI / forward deployed role listings: https://www.anthropic.com/careers
- Modal careers and Forward Deployed Engineer listings: https://modal.com/careers

Inference: Shubha's current resume is strongest for the hybrid FDE profile, not a pure AI research profile. The copy should be honest: AI/product implementation readiness backed by production backend, cloud, event-system, security, and enterprise delivery proof.

## Content Architecture

### Hero

Change from senior-backend framing to FDE framing.

Recommended hero headline:

> Forward deployed backend engineer for AI, data, and operations-heavy products.

Recommended hero subheadline:

> I work close to users and delivery teams to turn messy workflows into production Go services, event-driven platforms, and secure cloud infrastructure.

Role summary:

> Forward Deployed Engineer | Golang | Cloud-native systems

Primary CTA:

> Talk Through a Deployment Problem

Secondary CTAs:
- Download Resume
- View Implementation Proof

### Proof Strip

Use proof that supports FDE readiness:
- `6+` years building production backend systems.
- `8` engineers led on distributed backend delivery.
- `Enterprise` warehouse, manufacturing, banking, and healthcare systems.

Avoid over-claiming exact business impact where the resume does not provide a precise number.

### Services

Rename the conceptual framing from generic services to:

> How I Help Deployed Teams

Use three service cards:

1. **Turn messy workflows into deployed systems**
   - Discovery with users and delivery teams.
   - Workflow mapping.
   - Service boundaries and implementation plans.

2. **Build production backend and event platforms**
   - Go services.
   - gRPC, REST, Kafka, Pub/Sub, Azure Service Bus.
   - PostgreSQL, Redis, Aerospike.

3. **Make delivery secure and operable**
   - Kubernetes, Docker, Terraform.
   - CI/CD, BlackDuck, SonarQube.
   - Observability, compliance remediation, vulnerability reviews.

### Projects

Keep the current two project case studies, but frame them as FDE-style implementation proof:

- **Fikrabot**: compliance/document workflow translated into verification pipelines.
- **Medzimi**: multi-participant healthcare workflow translated into platform services and search infrastructure.

Project cards and detail pages should make the reader understand:
- What operational problem existed.
- What Shubha built.
- What systems thinking mattered.
- Why this proves FDE readiness.

### Experience

Keep all real resume experience. Reframe summaries and highlights to emphasize:
- User/customer/operations context.
- Distributed delivery.
- Ambiguous workflow translation.
- Production rollout and maintainability.
- Security and compliance where relevant.

Do not invent direct customer-facing claims. Use phrasing like "worked close to delivery teams", "supported warehouse management workflows", and "built systems for operational platforms" unless the resume explicitly says customer-facing.

### Skills

Reorganize skills around FDE execution modes:

- **Discover & Shape**: workflow mapping, technical discovery, implementation planning, delivery leadership.
- **Build**: Golang, gRPC, REST, microservices, PostgreSQL, Redis.
- **Connect**: Kafka, Google Pub/Sub, Azure Service Bus, message routing, event-driven systems.
- **Deploy**: Kubernetes, Docker, Terraform, GitHub Actions, AWS, GCP, Azure.
- **Operate & Secure**: BlackDuck, SonarQube, observability, Grafana, compliance remediation, vulnerability reviews.

### Writing / Labs

Keep one article and one lab, but align titles and summaries to FDE:

- Article: "How I Approach Forward Deployed Backend Work"
- Lab: "Event-Driven Implementation Notes for Operations Platforms"

These should help recruiters see communication ability, not just implementation skill.

### Final CTA

Recommended final CTA:

> Have an ambiguous deployment problem?

Body:

> Send the workflow, system context, or role brief. I can talk through how I would discover the problem, design the backend path, and ship the first reliable version.

CTA:

> Send the Role or Problem

## Visual Design

Keep the current "systems atelier" visual direction:
- Ivory/graphite/orange palette.
- Geometric logo.
- Engineering-grid and instrumentation feel.
- Editorial, technical, and production-focused tone.

No large redesign is required. The page already has enough visual distinction. The implementation should focus on content, section labels, and proof hierarchy.

Small visual/content hierarchy changes are allowed:
- Section headings can become more FDE-specific.
- Project cards can show "Problem / Built / Proof" labels if the component structure supports it cleanly.
- Navigation can remain `Services`, `Work`, `Labs`, `Writing`, `Contact` unless a clearer label is simple to support.

## Data Model Impact

The current CMS content model is sufficient.

Expected edits:
- `src/content/settings.json`
- `src/content/services.json`
- `src/content/skills.json`
- `src/content/experience.json`
- `src/content/projects/*.md`
- `src/content/articles/*.md`
- `src/content/labs/*.md`
- tests that assert copy or known slugs

No new CMS collections are required.

## Error Handling / Constraints

- Preserve Decap CMS compatibility.
- Preserve GitHub Pages deployment.
- Keep all content factual and resume-backed.
- Do not claim direct LLM production experience unless grounded in real work.
- Do not invent metrics, testimonials, employer names, or certifications.
- Keep the real resume PDFs in `public/uploads`.
- Keep route slugs stable unless there is a strong reason to change them.

## Testing And Verification

Required local checks:
- `npm test`
- `npm run build`
- Content scan for stale terms from older positioning:
  - `Decentralized`
  - `DeFi`
  - `robotics-ready` when used as primary positioning
  - generic backend-only hero language

Deployment checks:
- Push to `master`.
- Watch GitHub Pages workflow complete.
- Verify live homepage returns `200`.
- Verify live JS bundle contains the new FDE headline.
- Verify resume PDF still returns `200`.

## Success Criteria

The portfolio is ready when a recruiter or hiring manager can understand within the first viewport:
- Shubha is targeting Forward Deployed Engineer work.
- His strongest proof is production backend, enterprise systems, cloud delivery, event platforms, and security-aware implementation.
- He can work close to ambiguous operational problems and turn them into deployed systems.
- The claims are specific, credible, and resume-backed.

