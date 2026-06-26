# Decap CMS

## Access

Open `/admin` on deployed site.

## Authentication

Authenticate through the configured GitHub-backed Decap CMS backend.

For production, Decap needs a GitHub OAuth app and an OAuth proxy because GitHub does not support direct browser-only OAuth for static GitHub Pages sites. Configure the OAuth app callback URL for the deployed admin route, for example `https://<domain>/admin/` for a custom domain or `https://iamshubha.github.io/admin/` for GitHub Pages. The proxy must be configured with that OAuth app client ID and secret, and Decap must point at the proxy endpoint when the deployment uses one.

The GitHub identity used in the CMS must have write access to `iamshubha/iamshubha.github.io`. Limit access to trusted editors because CMS saves write commits to the repository.

## Publishing

Content saves create commits on `master`; deployment publishes the build. Treat `master` as both the GitHub Pages source branch and the Decap CMS commit target unless the site deployment policy changes.

Decap edits are regular Git commits. Review them like any other content change, and use the repository history to audit who changed what and when.

## Media

Resume PDFs and images belong in `public/uploads`. Decap stores uploaded media there and writes public URLs under `/uploads/...`; the build copies those assets into `dist/uploads`.

Resume entries should use the file picker for `fileUrl`, with current resume URLs such as `/uploads/backend.pdf`, `/uploads/ai.pdf`, and `/uploads/consulting.pdf`.

## Scheduling

Scheduling uses the external booking URL or embed configured in Site Settings. Edit Scheduling under the Site Settings collection; there is no separate Scheduling collection so two CMS screens cannot write competing versions of `src/content/settings.json`.

Use absolute HTTPS URLs for booking and embed URLs.

## Local editing fallback

Edit files in `src/content` directly if CMS OAuth integration is unavailable.

## Rollback

Because CMS changes are commits, rollback is the same as code rollback:

1. Find the content commit in GitHub history.
2. Revert the commit or restore the affected file from a known-good commit.
3. Let the deployment rebuild from `master`.

For media-only mistakes, remove or replace the asset in `public/uploads` and commit the change.

## Content constraints

Raw HTML in Markdown is intentionally stripped before rendering. Supported frontmatter shapes are constrained to the parser in `src/lib/content.js`: consistently indented key/value objects, arrays, nested array objects, quoted strings, inline arrays, booleans, nulls, and folded or literal block scalars.

CMS-managed JSON list files use an object-wrapped shape:

```json
{
  "items": []
}
```

The app normalizes those `items` arrays in `getPortfolioContent()` so components still receive arrays.
