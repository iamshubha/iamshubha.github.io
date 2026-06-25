export default function FinalCta({ settings }) {
  const bookingUrl = settings.scheduling?.bookingUrl || settings.primaryCta.url;
  const finalCta = settings.finalCta;

  if (!finalCta?.title || !finalCta?.body) {
    return null;
  }

  return (
    <section className="final-cta" id="contact" aria-labelledby="contact-title">
      {finalCta.eyebrow && <p className="section-eyebrow">{finalCta.eyebrow}</p>}
      <h2 id="contact-title">{finalCta.title}</h2>
      <p>{finalCta.body}</p>
      <div className="final-cta__actions">
        <a className="final-cta__primary" href={bookingUrl}>
          {settings.primaryCta.label}
        </a>
        <a className="final-cta__secondary" href={`mailto:${settings.email}`}>
          {settings.email}
        </a>
      </div>
    </section>
  );
}
