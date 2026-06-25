import { Link, useParams } from "react-router-dom";

import { findBySlug, getPortfolioContent } from "../lib/content.js";
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
  const { labs } = getPortfolioContent();
  const lab = findBySlug(labs, slug);

  if (!lab) {
    return <NotFoundPage />;
  }

  return (
    <main id="main">
      <Link to="/">Back home</Link>
      <article>
        <p>Lab</p>
        <h1>{lab.title}</h1>
        <p>{lab.summary}</p>
        <FactList item={lab} />
        <div dangerouslySetInnerHTML={{ __html: lab.html }} />
      </article>
    </main>
  );
}
