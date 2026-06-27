function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (!parts.length) {
    return "·";
  }

  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

export default function Testimonials({ testimonials = [] }) {
  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <p className="section-eyebrow">Testimonials</p>
      <h2 id="testimonials-title">What collaborators say</h2>
      <div className="testimonials__grid">
        {testimonials.map((testimonial) => {
          const meta = [testimonial.role, testimonial.company]
            .filter(Boolean)
            .join(" · ");

          return (
            <figure
              className="testimonial"
              key={`${testimonial.name}-${testimonial.company}`}
            >
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption className="testimonial__author">
                <span className="testimonial__avatar" aria-hidden="true">
                  {initials(testimonial.name)}
                </span>
                <span className="testimonial__identity">
                  <span className="testimonial__name">{testimonial.name}</span>
                  {meta && <span className="testimonial__meta">{meta}</span>}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
