import { Link, useParams } from "react-router-dom";

import { findBySlug, getPortfolioContent } from "../lib/content.js";
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
  const { projects } = getPortfolioContent();
  const project = findBySlug(projects, slug);

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <main id="main">
      <Link to="/">Back home</Link>
      <article>
        <p>Case Study</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <FactList item={project} />
        <div dangerouslySetInnerHTML={{ __html: project.html }} />
      </article>
    </main>
  );
}
