function formatDateRange(role) {
  const start = role.startDate || "Earlier";
  const end = role.present ? "Present" : role.endDate;

  return [start, end].filter(Boolean).join(" - ");
}

export default function ExperienceTimeline({ experience = [] }) {
  if (!experience.length) {
    return null;
  }

  return (
    <section className="experience" aria-labelledby="experience-title">
      <p className="section-eyebrow">Experience</p>
      <h2 id="experience-title">Experience Timeline</h2>
      <ol className="experience__timeline">
        {experience.map((role) => (
          <li className="experience__item" key={`${role.company}-${role.startDate}`}>
            <article>
              <p className="experience__date">{formatDateRange(role)}</p>
              <h3>
                {role.role}, {role.company}
              </h3>
              <p>{role.location}</p>
              <p>{role.summary}</p>
              {!!role.highlights?.length && (
                <ul>
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
