export default function FinalCta({ settings }) {
  const bookingUrl = settings.scheduling?.bookingUrl || settings.primaryCta?.url;
  const finalCta = settings.finalCta;
  const primaryLabel = settings.primaryCta?.label || "Book a Project Call";

  if (!finalCta?.title || !finalCta?.body) {
    return null;
  }

  return (
    <section className="final-cta" id="contact" aria-labelledby="contact-title">
      {finalCta.eyebrow && <p className="section-eyebrow">{finalCta.eyebrow}</p>}
      <h2 id="contact-title">{finalCta.title}</h2>
      <p>{finalCta.body}</p>
      <div className="final-cta__actions">
        {bookingUrl && (
          <a className="final-cta__primary" href={bookingUrl}>
            {primaryLabel}
          </a>
        )}
        {settings.email && (
          <a className="final-cta__secondary" href={`mailto:${settings.email}`}>
            {settings.email}
          </a>
        )}
      </div>
    </section>
  );
}
