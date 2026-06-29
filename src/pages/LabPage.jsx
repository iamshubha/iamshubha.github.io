import { Link, useParams } from "react-router-dom";

import { findBySlug, getPortfolioContent } from "../lib/content.js";
import {
  breadcrumbSchema,
  creativeWorkSchema,
  useSeo
} from "../lib/seo.js";
import NotFoundPage from "./NotFoundPage.jsx";

function FactList({ item }) {
  return (
    <dl>
      {item.status ? (
        <div>
          <dt>Status</dt>
          <dd>{item.status}</dd>
        </div>
      ) : null}
      {item.stack?.length ? (
        <div>
          <dt>Stack</dt>
          <dd>{item.stack.join(", ")}</dd>
        </div>
      ) : null}
    </dl>
  );
}

export default function LabPage() {
  const { slug } = useParams();
  const { labs, settings } = getPortfolioContent();
  const lab = findBySlug(labs, slug);
  const path = `/labs/${slug}/`;

  useSeo(
    lab
      ? {
          title: `${lab.title} | ${settings.name}`,
          description: lab.summary,
          path,
          type: "article",
          jsonLd: [
            creativeWorkSchema({
              type: "CreativeWork",
              title: lab.title,
              description: lab.summary,
              path,
              date: lab.date
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: lab.title, path }
            ])
          ]
        }
      : { title: `Page not found | ${settings.name}`, path, noindex: true }
  );

  if (!lab) {
    return <NotFoundPage />;
  }

  return (
    <main id="main" className="detail-page site-shell">
      <Link className="button button-secondary" to="/">Back home</Link>
      <article>
        <p className="eyebrow">Lab</p>
        <h1>{lab.title}</h1>
        <p>{lab.summary}</p>
        <FactList item={lab} />
        <div dangerouslySetInnerHTML={{ __html: lab.html }} />
      </article>
    </main>
  );
}
