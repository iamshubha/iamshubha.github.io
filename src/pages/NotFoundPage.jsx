import { Link } from "react-router-dom";

import { useSeo } from "../lib/seo.js";

export default function NotFoundPage() {
  useSeo({ title: "Page not found | Shubha Banerjee", noindex: true });

  return (
    <main id="main" className="detail-page site-shell" aria-labelledby="not-found-heading">
      <p className="eyebrow">404</p>
      <h1 id="not-found-heading">Page not found</h1>
      <p className="lede">The page you requested could not be found.</p>
      <Link className="button button-secondary" to="/">
        Back home
      </Link>
    </main>
  );
}
