export default function Services({ services = [] }) {
  if (!services.length) {
    return null;
  }

  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <p className="section-eyebrow">Services</p>
      <h2 id="services-title">Services</h2>
      <div className="services__grid">
        {services.map((service) => (
          <article className="service-card" key={service.slug}>
            <h3>{service.title}</h3>
            <p>{service.summary}</p>
            {!!service.capabilities?.length && (
              <>
                <h4>Capabilities</h4>
                <ul>
                  {service.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </>
            )}
            {!!service.proofPoints?.length && (
              <>
                <h4>Proof Points</h4>
                <ul>
                  {service.proofPoints.map((proofPoint) => (
                    <li key={proofPoint}>{proofPoint}</li>
                  ))}
                </ul>
              </>
            )}
            {service.cta?.url && service.cta?.label && (
              <a className="service-card__cta" href={service.cta.url}>
                {service.cta.label}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
