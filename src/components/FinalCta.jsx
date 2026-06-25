export default function FinalCta({ settings }) {
  const bookingUrl = settings.scheduling?.bookingUrl || settings.primaryCta.url;

  return (
    <section className="final-cta" id="contact" aria-labelledby="contact-title">
      <p className="section-eyebrow">Contact</p>
      <h2 id="contact-title">Build Production Confidence Into the Backend</h2>
      <p>
        For backend, cloud, automation, or AI-aware systems work, start with a focused
        project call or send the context by email.
      </p>
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
