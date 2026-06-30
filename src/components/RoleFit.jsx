export default function RoleFit({ roleFit }) {
  const signals = roleFit?.signals || [];

  if (!roleFit?.title || !signals.length) {
    return null;
  }

  return (
    <section className="role-fit" id="fit" aria-labelledby="fit-title">
      {roleFit.eyebrow && <p className="section-eyebrow">{roleFit.eyebrow}</p>}
      <div className="role-fit__header">
        <h2 id="fit-title">{roleFit.title}</h2>
        {roleFit.body && <p>{roleFit.body}</p>}
      </div>
      <div className="role-fit__grid">
        {signals.map((signal) => (
          <article className="role-fit__item" key={signal.title}>
            <h3>{signal.title}</h3>
            <p>{signal.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
