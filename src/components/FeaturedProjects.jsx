export default function FeaturedProjects({ projects = [] }) {
  const featuredProjects = projects.filter((project) => project.featured);

  if (!featuredProjects.length) {
    return null;
  }

  return (
    <section className="featured-projects" id="work" aria-labelledby="work-title">
      <p className="section-eyebrow">Work</p>
      <h2 id="work-title">Featured Projects</h2>
      <div className="featured-projects__grid">
        {featuredProjects.map((project) => (
          <article className="project-card" key={project.slug}>
            <h3>
              <a href={`#/projects/${project.slug}`}>{project.title}</a>
            </h3>
            <p>{project.summary}</p>
            <dl className="project-card__facts">
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>{project.stack.join(", ")}</dd>
              </div>
            </dl>
            {!!project.impactMetrics?.length && (
              <dl className="project-card__metrics" aria-label={`${project.title} impact metrics`}>
                {project.impactMetrics.map((metric) => (
                  <div key={`${project.slug}-${metric.value}-${metric.label}`}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
