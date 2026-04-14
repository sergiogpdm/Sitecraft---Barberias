import Container from "../Container.jsx";

export default function TestimonialsSection({ data }) {
  const items = Array.isArray(data?.items) ? data.items : [];

  return (
    <section
      id="testimonials"
      style={{
        padding: "100px 0 90px",
      }}
    >
      <Container wide>
        <div
          style={{
            maxWidth: 860,
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
              maxWidth: 760,
              marginInline: "auto",
            }}
          >
            {data.title}
          </h2>

          {data.desc ? (
            <p
              style={{
                margin: "22px auto 0",
                maxWidth: 680,
                color: "var(--muted)",
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              {data.desc}
            </p>
          ) : null}
        </div>

        <div className="testimonials-pro-grid" style={{ marginTop: 54 }}>
          {items.map((item, index) => (
            <article key={`${item.name}-${index}`} className="testimonial-pro-card">
              <div className="testimonial-pro-stars">★★★★★</div>

              <p className="testimonial-pro-text">
                “{item.text}”
              </p>

              <div className="testimonial-pro-footer">
                <div className="testimonial-pro-name">{item.name}</div>
                <div className="testimonial-pro-service">{item.service}</div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}