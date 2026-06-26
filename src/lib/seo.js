import { useEffect } from "react";

import settings from "../content/settings.json";

export const SITE_URL = "https://iamshubha.github.io";
const DEFAULT_IMAGE = `${SITE_URL}/logo512.png`;
const JSONLD_ID = "seo-jsonld";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

function upsertMeta(attr, key, content) {
  if (content == null) {
    return;
  }

  let element = document.head.querySelector(`meta[${attr}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function setJsonLd(data) {
  const existing = document.getElementById(JSONLD_ID);

  if (!data) {
    if (existing) {
      existing.remove();
    }

    return;
  }

  const script = existing || document.createElement("script");
  script.type = "application/ld+json";
  script.id = JSONLD_ID;
  script.textContent = JSON.stringify(data);

  if (!existing) {
    document.head.appendChild(script);
  }
}

export function setDocumentSeo({
  title,
  description = settings.seoDescription,
  path = "/",
  type = "website",
  image = DEFAULT_IMAGE,
  noindex = false,
  jsonLd = null
} = {}) {
  const fullTitle = title || settings.seoTitle;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  document.title = fullTitle;

  upsertMeta("name", "description", description);
  upsertMeta("name", "theme-color", settings.themeColor);
  upsertMeta("name", "author", settings.name);
  upsertMeta(
    "name",
    "robots",
    noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
  );

  upsertLink("canonical", url);

  upsertMeta("property", "og:type", type);
  upsertMeta("property", "og:title", fullTitle);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:image", imageUrl);
  upsertMeta("property", "og:site_name", settings.name);

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", fullTitle);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", imageUrl);

  setJsonLd(jsonLd);
}

export function useSeo(options) {
  // Re-run whenever any SEO field changes (slug-driven routes).
  const key = JSON.stringify(options ?? {});

  useEffect(() => {
    setDocumentSeo(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

// ---- Structured data builders ----

export function personSchema({ skills = [] } = {}) {
  const knowsAbout = skills
    .flatMap((group) => group.skills || [])
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.name,
    jobTitle: settings.roleSummary,
    description: settings.seoDescription,
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    email: settings.email ? `mailto:${settings.email}` : undefined,
    sameAs: [settings.githubUrl, settings.linkedinUrl].filter(Boolean),
    knowsAbout: knowsAbout.length ? knowsAbout : undefined
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.name,
    url: SITE_URL,
    description: settings.seoDescription
  };
}

export function breadcrumbSchema(trail = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path)
    }))
  };
}

export function creativeWorkSchema({ type, title, description, path, date }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: title,
    name: title,
    description,
    url: absoluteUrl(path),
    datePublished: date || undefined,
    image: DEFAULT_IMAGE,
    author: {
      "@type": "Person",
      name: settings.name,
      url: SITE_URL
    }
  };
}
