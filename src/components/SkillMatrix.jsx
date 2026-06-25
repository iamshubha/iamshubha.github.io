export default function SkillMatrix({ skills = [] }) {
  const sortedSkills = skills
    .filter((group) => Array.isArray(group.skills) && group.skills.length > 0)
    .sort((a, b) => a.priority - b.priority);

  if (!sortedSkills.length) {
    return null;
  }

  return (
    <section className="skill-matrix" aria-labelledby="skills-title">
      <p className="section-eyebrow">Skills</p>
      <h2 id="skills-title">Skill Matrix</h2>
      <div className="skill-matrix__grid">
        {sortedSkills.map((group) => (
          <article className="skill-group" key={group.groupName}>
            <h3>{group.groupName}</h3>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
