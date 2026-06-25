export default function Testimonials({ testimonials = [] }) {
  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <p className="section-eyebrow">Testimonials</p>
      <h2 id="testimonials-title">Testimonials</h2>
      <div className="testimonials__grid">
        {testimonials.map((testimonial) => (
          <figure className="testimonial" key={`${testimonial.name}-${testimonial.company}`}>
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>
              {testimonial.name}
              {testimonial.role ? `, ${testimonial.role}` : ""}
              {testimonial.company ? `, ${testimonial.company}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
