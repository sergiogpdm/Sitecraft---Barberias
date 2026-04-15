import Container from "../Container.jsx";

export default function TestimonialsSection({ data, compact = false }) {
  const items = Array.isArray(data?.items) ? data.items : [];

  return (
    <section
      id="testimonials"
      style={{
        padding: compact ? "0" : "120px 0 100px",
      }}
    >
      <Container wide={!compact}>
        <div
          style={{
            maxWidth: compact ? "100%" : 900,
            margin: compact ? "0" : "0 auto",
            textAlign: compact ? "left" : "center",
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
              fontSize: compact
                ? "clamp(30px, 4vw, 52px)"
                : "clamp(38px, 5vw, 68px)",
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              maxWidth: compact ? 520 : 760,
              marginInline: compact ? "0" : "auto",
            }}
          >
            {data.title}
          </h2>

          {data.desc ? (
            <p
              style={{
                margin: "18px 0 0",
                maxWidth: compact ? 520 : 700,
                color: "var(--muted)",
                fontSize: compact ? 16 : 18,
                lineHeight: 1.8,
              }}
            >
              {data.desc}
            </p>
          ) : null}
        </div>

        <div className={`testimonials-grid ${compact ? "is-compact" : ""}`}>
          {items.map((item, index) => (
            <TestimonialCard key={index} {...item} compact={compact} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialCard({ name, service, text, compact = false }) {
  return (
    <div className={`testimonial-card ${compact ? "is-compact" : ""}`}>
      <div className="testimonial-stars">★★★★★</div>

      <p className="testimonial-text">“{text}”</p>

      <div className="testimonial-footer">
        <strong>{name}</strong>
        <span>{service}</span>
      </div>
    </div>
  );
}