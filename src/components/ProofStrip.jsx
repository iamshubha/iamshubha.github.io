import CountUp from "./CountUp.jsx";

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
            <dd>
              <CountUp value={metric.value} />
            </dd>
            <dt>{metric.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
