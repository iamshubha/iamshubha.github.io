import { Link, useParams } from "react-router-dom";

import { findBySlug, getPortfolioContent } from "../lib/content.js";
import {
  breadcrumbSchema,
  creativeWorkSchema,
  useSeo
} from "../lib/seo.js";
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
  const { articles, settings } = getPortfolioContent();
  const article = findBySlug(articles, slug);
  const path = `/articles/${slug}/`;
  const dateStr = article ? formatFactValue(article.date) : undefined;

  useSeo(
    article
      ? {
          title: `${article.title} | ${settings.name}`,
          description: article.summary,
          path,
          type: "article",
          jsonLd: [
            creativeWorkSchema({
              type: "TechArticle",
              title: article.title,
              description: article.summary,
              path,
              date: dateStr
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: article.title, path }
            ])
          ]
        }
      : { title: `Page not found | ${settings.name}`, path, noindex: true }
  );

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <main id="main" className="detail-page site-shell">
      <Link className="button button-secondary" to="/">Back home</Link>
      <article>
        <p className="eyebrow">Article</p>
        <h1>{article.title}</h1>
        <p>{article.summary}</p>
        <FactList item={article} />
        <div dangerouslySetInnerHTML={{ __html: article.html }} />
      </article>
    </main>
  );
}
