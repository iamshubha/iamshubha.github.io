export default function PreviewRail({
  eyebrow,
  hrefForItem,
  id,
  items = [],
  summary,
  title
}) {
  if (!items.length) {
    return null;
  }

  const titleId = `${id}-title`;

  return (
    <section className="preview-rail" id={id} aria-labelledby={titleId}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 id={titleId}>{title}</h2>
      {summary && <p>{summary}</p>}
      <div className="preview-rail__items">
        {items.map((item) => {
          const meta = [item.category, item.status, item.date].filter(Boolean).join(" / ");

          return (
            <article className="preview-card" key={item.slug}>
              {meta && <p className="preview-card__meta">{meta}</p>}
              <h3>
                <a href={hrefForItem(item)}>{item.title}</a>
              </h3>
              <p>{item.summary}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
