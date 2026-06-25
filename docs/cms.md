# Decap CMS

## Access

Open `/admin` on deployed site.

## Authentication

Authenticate through configured GitHub-backed Decap CMS backend.

## Publishing

Content saves create commits on `master`; deployment publishes the build.

## Media

Resume PDFs and images belong in `public/uploads`.

## Scheduling

Scheduling uses external booking URL or embed configured in Site Settings.

## Local editing fallback

Edit files in `src/content` directly if CMS OAuth integration is unavailable.

## Content constraints

Raw HTML in Markdown is intentionally stripped before rendering. Supported frontmatter shapes are constrained to the parser in `src/lib/content.js`: consistently indented key/value objects, arrays, nested array objects, quoted strings, inline arrays, booleans, nulls, and folded or literal block scalars.
