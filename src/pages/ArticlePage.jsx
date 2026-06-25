import { Link, useParams } from "react-router-dom";

import { findBySlug, getPortfolioContent } from "../lib/content.js";
import NotFoundPage from "./NotFoundPage.jsx";

function formatFactValue(value) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value);
}

function FactList({ item }) {
  return (
    <dl>
      {item.category ? (
        <div>
          <dt>Category</dt>
          <dd>{item.category}</dd>
        </div>
      ) : null}
      {item.date ? (
        <div>
          <dt>Date</dt>
          <dd>{formatFactValue(item.date)}</dd>
        </div>
      ) : null}
    </dl>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const { articles } = getPortfolioContent();
  const article = findBySlug(articles, slug);

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <main id="main">
      <Link to="/">Back home</Link>
      <article>
        <p>Article</p>
        <h1>{article.title}</h1>
        <p>{article.summary}</p>
        <FactList item={article} />
        <div dangerouslySetInnerHTML={{ __html: article.html }} />
      </article>
    </main>
  );
}
