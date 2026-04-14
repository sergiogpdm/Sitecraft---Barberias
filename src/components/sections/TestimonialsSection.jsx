import Container from "../Container.jsx";

export default function TestimonialsSection({ data }) {
  const items = Array.isArray(data?.items) ? data.items : [];

  return (
    <section
      id="testimonials"
      style={{
        padding: "120px 0 100px",
      }}
    >
      <Container wide>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {data.kicker ? (
            <div
              style={{
                color: "var(--accentA)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: 13,
                marginBottom: 18,
              }}
            >
              {data.kicker}
            </div>
          ) : null}

          <h2
            style={{
              margin: 0,
              fontSize: "clamp(38px, 5vw, 68px)",
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
            }}
          >
            {data.title}
          </h2>

          {data.desc ? (
            <p
              style={{
                margin: "22px auto 0",
                maxWidth: 700,
                color: "var(--muted)",
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              {data.desc}
            </p>
          ) : null}
        </div>

        <div className="testimonials-grid">
          {items.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialCard({ name, service, text }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">★★★★★</div>

      <p className="testimonial-text">“{text}”</p>

      <div className="testimonial-footer">
        <strong>{name}</strong>
        <span>{service}</span>
      </div>
    </div>
  );
}