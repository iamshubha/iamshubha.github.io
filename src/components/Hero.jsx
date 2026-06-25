function MetricPanel({ metrics = [] }) {
  if (!metrics.length) {
    return null;
  }

  return (
    <aside className="hero__proof" aria-label="Selected impact metrics">
      <h2>Selected Impact</h2>
      <dl>
        {metrics.map((metric) => (
          <div key={`${metric.value}-${metric.label}`}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

export default function Hero({ settings }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="hero__role">{settings.roleSummary}</p>
        <h1 id="hero-title">{settings.name}</h1>
        <h2>{settings.heroHeadline}</h2>
        <p className="hero__summary">{settings.heroSubheadline}</p>
        <div className="hero__ctas" aria-label="Primary actions">
          <a className="hero__cta hero__cta--primary" href={settings.primaryCta.url}>
            {settings.primaryCta.label}
          </a>
          {settings.secondaryCtas.map((cta) => (
            <a className="hero__cta hero__cta--secondary" href={cta.url} key={cta.url}>
              {cta.label}
            </a>
          ))}
        </div>
      </div>
      <MetricPanel metrics={settings.featuredMetrics} />
    </section>
  );
}
