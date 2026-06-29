#!/usr/bin/env node
// Copies the built index.html into clean route directories listed in sitemap.xml.
// This lets GitHub Pages serve SPA detail URLs with HTTP 200 instead of 404.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://iamshubha.github.io";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const indexPath = join(distDir, "index.html");
const sitemapPath = join(root, "public", "sitemap.xml");

function routePathFromLoc(loc) {
  if (!loc.startsWith(SITE_URL)) {
    return null;
  }

  const path = loc.slice(SITE_URL.length).replace(/^\/+|\/+$/g, "");

  return path || null;
}

const sitemap = readFileSync(sitemapPath, "utf8");
const locs = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
const routes = locs.map(routePathFromLoc).filter(Boolean);

for (const route of routes) {
  const routePath = join(distDir, route);
  mkdirSync(dirname(routePath), { recursive: true });
  copyFileSync(indexPath, routePath);
}

console.log(`route fallbacks generated for ${routes.length} clean URLs`);
