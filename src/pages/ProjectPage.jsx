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
      <div>
        <dt>Role</dt>
        <dd>{item.role}</dd>
      </div>
      <div>
        <dt>Stack</dt>
        <dd>{item.stack.join(", ")}</dd>
      </div>
    </dl>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const { projects, settings } = getPortfolioContent();
  const project = findBySlug(projects, slug);
  const path = `/projects/${slug}`;

  useSeo(
    project
      ? {
          title: `${project.title} | ${settings.name}`,
          description: project.summary,
          path,
          type: "article",
          jsonLd: [
            creativeWorkSchema({
              type: "CreativeWork",
              title: project.title,
              description: project.summary,
              path,
              date: project.date
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: project.title, path }
            ])
          ]
        }
      : { title: `Page not found | ${settings.name}`, path, noindex: true }
  );

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <main id="main" className="detail-page site-shell">
      <Link className="button button-secondary" to="/">Back home</Link>
      <article>
        <p className="eyebrow">Case Study</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <FactList item={project} />
        <div dangerouslySetInnerHTML={{ __html: project.html }} />
      </article>
    </main>
  );
}
