export default function ProofStrip({ metrics = [] }) {
  if (!metrics.length) {
    return null;
  }

  return (
    <section className="proof-strip" aria-labelledby="proof-strip-title">
      <h2 id="proof-strip-title">Proof in Production</h2>
      <dl className="proof-strip__metrics">
        {metrics.map((metric) => (
          <div className="proof-strip__metric" key={`${metric.value}-${metric.label}`}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
