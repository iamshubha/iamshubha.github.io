# Dynamic Portfolio Website Design

Date: 2026-06-25
Repo: `iamshubha/iamshubha.github.io`
Source branch: `master`
Deploy branch: `gh-pages`

## Goal

Create a dynamic, CMS-managed portfolio for Shubha Banerjee that presents him as an engineering operator for backend and cloud systems, with credible AI engineering and robotics signals.

The site must serve two primary audiences:

- Hiring managers and recruiters who need fast proof of senior backend capability.
- Consulting leads who need confidence that Shubha can deliver production backend, cloud, automation, and AI-ready systems.

The first release should be expandable, not a one-off landing page. Content should be editable through a browser UI, committed back to GitHub, and deployed as a static GitHub Pages site.

## Positioning

Primary direction: Engineering Operator.

Tone:

- Production-minded
- Direct
- Credible
- Technically sharp
- Open to ambitious AI and robotics work

Primary offer:

Backend and cloud systems for teams that need production confidence.

Supporting offer:

AI-enabled backend workflows, automation systems, and robotics-adjacent software for real-world infrastructure.

Hero copy direction:

- Headline: "Backend Systems for Teams That Need Production Confidence"
- Subheadline: "I build cloud-native APIs, automation workflows, and AI-ready backend systems, with an eye toward robotics and real-world infrastructure."
- Primary CTA: "Book a Project Call"
- Secondary CTAs: "Download Resume" and "Contact Me"

## Architecture

Use the `master` branch as the source branch. The current `gh-pages` branch contains deployed build output and should not be edited directly for source changes.

The app remains a React and Tailwind site, but hardcoded portfolio content should move into structured content files that are managed by Decap CMS.

GitHub remains the source of truth:

1. User edits content in Decap CMS at `/admin`.
2. Decap CMS commits changes to the GitHub repository.
3. The site builds from source content.
4. GitHub Pages publishes the production build to `gh-pages`.

No custom database is included in this design. Live scheduling should use an external scheduling URL or embed so the site can stay static.

## Content Model

The first release includes these CMS-managed collections.

### Site Settings

Purpose: global identity, metadata, and conversion links.

Fields:

- Name
- Role summary
- Hero headline
- Hero subheadline
- Primary CTA label and URL
- Secondary CTA labels and URLs
- Email
- GitHub URL
- LinkedIn URL
- SEO title
- SEO description
- Theme color
- Featured metrics

### Resume Variants

Purpose: support multiple downloadable resumes without changing code.

Fields:

- Variant name, such as Backend, AI, Consulting
- File URL or uploaded PDF
- Short description
- Primary audience
- Last updated date

### Services

Purpose: explain what Shubha can solve.

Initial service groups:

- Backend & Cloud Systems
- AI-Enabled Engineering
- Robotics-Ready Systems

Fields:

- Title
- Short summary
- Capabilities
- Proof points
- Related projects
- CTA label and URL

### Projects

Purpose: recruiter-scannable and consulting-friendly case studies.

Fields:

- Title
- Slug
- Summary
- Client/company/context
- Role
- Problem
- Work performed
- Stack
- Impact metrics
- Links
- Featured flag
- Cover image
- Detail body

Each project should support a detail page when more depth is needed.

### Experience

Purpose: structured professional timeline.

Fields:

- Role
- Company
- Location
- Start date
- End date or present flag
- Summary
- Highlights
- Technologies
- Impact metrics

### Skills

Purpose: fast technical scanning.

Fields:

- Group name
- Skills
- Priority

Initial groups:

- Backend
- Cloud & Infrastructure
- AI & Automation
- Robotics-Adjacent Systems
- Blockchain
- Security & DevOps

### Blog / Articles

Purpose: publish notes and long-form writing.

Topics:

- AI
- Backend engineering
- Robotics
- Blockchain

Fields:

- Title
- Slug
- Summary
- Category
- Tags
- Published date
- Draft flag
- Body
- SEO metadata

### Labs

Purpose: show experiments, prototypes, robotics demos, AI tools, and technical explorations.

Fields:

- Title
- Slug
- Summary
- Status
- Category
- Stack
- Demo URL
- Repository URL
- Media
- Notes

### Testimonials / Proof

Purpose: credibility and trust.

Fields:

- Quote
- Person
- Role
- Company
- Relationship
- Permission status
- Featured flag

### Certifications

Purpose: structured proof of credentials.

Fields:

- Name
- Issuer
- Status
- Issue date
- Credential URL
- Notes

### Speaking / Open Source

Purpose: public proof and community activity.

Fields:

- Title
- Type, such as Talk, Article, Repository, Contribution
- Date
- URL
- Summary
- Featured flag

### Scheduling

Purpose: allow consulting leads to book time.

Fields:

- Scheduling provider
- Booking URL
- Embed URL if available
- Fallback contact text

Implementation constraint: use an external scheduler link or embed. Do not build custom calendar logic in the first release.

## Public Site Structure

### Homepage

The homepage is the portfolio itself.

Sections:

1. Hero with positioning, CTA stack, and compact proof panel.
2. Proof strip with measurable outcomes.
3. Services with backend/cloud first, then AI and robotics.
4. Selected work with featured case studies.
5. Experience timeline.
6. Technical stack.
7. Labs preview.
8. Writing preview.
9. Testimonials/proof.
10. Certifications and public proof.
11. About / working style.
12. Final CTA.

### Project Detail Pages

Each project detail page should support:

- Problem
- Context
- Role
- Architecture or approach
- Stack
- Outcome
- Lessons or tradeoffs
- Links
- Related projects

### Blog Article Pages

Each article page should support:

- Title
- Summary
- Date
- Category
- Tags
- Body
- Related articles

### Lab Detail Pages

Each lab page should support:

- Experiment goal
- Current status
- Stack
- Screenshots or media
- Demo/repository links
- Notes and next steps

### Admin

Decap CMS should be available at `/admin`.

The admin should expose collections for all content types in this spec. Editors should not need to touch React code for normal portfolio updates.

## Visual Direction

Use the approved Engineering Operator direction:

- Editorial but technical.
- Light theme with tinted neutrals and sharp accent color.
- Avoid generic blue gradient portfolio styling.
- Avoid card-heavy sameness.
- Use clear hierarchy, varied spacing, and concise copy.
- Use real proof and measurable outcomes rather than vague claims.

The visual system should feel like a production engineering brief rather than a decorative personal website.

## Motion Direction

Motion should support comprehension and polish, not decoration.

Required motion:

- Signature hero entrance with staggered reveal.
- Lightweight system-status or impact panel animation.
- Project card hover and focus states that reveal role, stack, and impact.
- Scroll-triggered section reveals using `transform` and `opacity`.
- Labs interactions can be more expressive, but must stay performance-safe.
- Page transitions should be subtle and interruptible.

Constraints:

- Respect `prefers-reduced-motion`.
- Do not animate layout properties such as width, height, top, left, padding, or margin.
- Do not use `transition: all`.
- Use purposeful easing such as ease-out-quart, ease-out-quint, or ease-out-expo.
- Keep feedback animations fast.

## Accessibility And Interface Rules

Follow the current Web Interface Guidelines:

- Use semantic HTML.
- Use buttons for actions and links for navigation.
- Ensure visible focus states.
- Provide image alt text and dimensions.
- Keep heading hierarchy valid.
- Include a skip link.
- Ensure icon-only buttons have `aria-label`.
- Support keyboard interaction for interactive elements.
- Use `aria-live` for async feedback where needed.
- Do not disable zoom.

## Copy Rules

Copy should be clear before clever.

Use:

- Specific claims.
- Measurable outcomes.
- Active voice.
- Plain language.
- Concrete CTAs.

Avoid:

- Fabricated numbers.
- Generic "innovative solutions" phrasing.
- Overclaiming AI or robotics expertise without proof.
- First-person-heavy biography sections.

## Error Handling

Because this is a static site, errors are mostly content and rendering concerns.

The implementation should handle:

- Missing optional fields without broken UI.
- Empty collections with useful fallback states.
- Broken external links with safe rendering.
- Missing images with graceful placeholders.
- CMS draft content not appearing publicly unless intended.

## Testing And Verification

Minimum verification:

- Build succeeds.
- Content-driven homepage renders from data files.
- Decap CMS config validates enough to load `/admin`.
- Project detail route renders from project content.
- Blog route renders from article content.
- Lab route renders from lab content.
- Empty states render correctly.
- Keyboard navigation works.
- Reduced motion mode works.
- Mobile and desktop layouts do not overlap or overflow.
- Web Interface Guidelines review finds no blocking issues.

## Out Of Scope

The first release does not include:

- Custom database.
- Custom authentication system beyond Decap/GitHub auth.
- Custom calendar backend.
- Payments.
- Multi-language support.
- Multi-user editorial workflow beyond what Decap/GitHub supports.

## Implementation Direction

- Default implementation direction: migrate the source app from Create React App to Vite React while preserving GitHub Pages static deployment.
- Routing must work on static GitHub Pages. Prefer hash routing if needed to avoid server rewrite requirements.
- Decap CMS GitHub backend and OAuth setup requirements must be documented during implementation.
- The existing hardcoded portfolio component should be replaced with data-rendering components.
