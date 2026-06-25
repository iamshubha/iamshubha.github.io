export default function AboutSection({ about }) {
  if (!about?.title || !about?.body) {
    return null;
  }

  return (
    <section className="about-section" aria-labelledby="about-title">
      {about.eyebrow && <p className="section-eyebrow">{about.eyebrow}</p>}
      <h2 id="about-title">{about.title}</h2>
      <p>{about.body}</p>
      {!!about.bullets?.length && (
        <ul>
          {about.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
