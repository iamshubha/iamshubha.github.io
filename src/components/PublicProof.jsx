function CertificationList({ certifications }) {
  if (!certifications.length) {
    return null;
  }

  return (
    <div className="public-proof__group">
      <h3>Certifications</h3>
      <ul>
        {certifications.map((certification) => (
          <li key={`${certification.name}-${certification.issuer}`}>
            {certification.credentialUrl ? (
              <a href={certification.credentialUrl}>{certification.name}</a>
            ) : (
              certification.name
            )}
            <span>
              {" "}
              - {certification.issuer}
              {certification.status ? `, ${certification.status}` : ""}
            </span>
            {certification.notes && <p>{certification.notes}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SpeakingList({ speaking }) {
  if (!speaking.length) {
    return null;
  }

  return (
    <div className="public-proof__group">
      <h3>Speaking & Open Source</h3>
      <ul>
        {speaking.map((item) => (
          <li key={`${item.title}-${item.event || item.platform}`}>
            {item.url ? <a href={item.url}>{item.title}</a> : item.title}
            {(item.event || item.platform) && <span> - {item.event || item.platform}</span>}
            {item.summary && <p>{item.summary}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PublicProof({ certifications = [], speaking = [] }) {
  if (!certifications.length && !speaking.length) {
    return null;
  }

  return (
    <section className="public-proof" aria-labelledby="public-proof-title">
      <p className="section-eyebrow">Public Proof</p>
      <h2 id="public-proof-title">Public Proof</h2>
      <CertificationList certifications={certifications} />
      <SpeakingList speaking={speaking} />
    </section>
  );
}
