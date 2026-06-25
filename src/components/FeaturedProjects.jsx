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
        {featuredProjects.map((project) => {
          const stack = project.stack || [];
          const hasFacts = Boolean(project.role) || stack.length > 0;

          return (
            <article className="project-card" key={project.slug}>
              <h3>
                <a href={`#/projects/${project.slug}`}>{project.title}</a>
              </h3>
              <p>{project.summary}</p>
              {hasFacts && (
                <dl className="project-card__facts">
                  {project.role && (
                    <div>
                      <dt>Role</dt>
                      <dd>{project.role}</dd>
                    </div>
                  )}
                  {!!stack.length && (
                    <div>
                      <dt>Stack</dt>
                      <dd>{stack.join(", ")}</dd>
                    </div>
                  )}
                </dl>
              )}
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
          );
        })}
      </div>
    </section>
  );
}
