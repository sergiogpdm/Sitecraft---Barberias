import Container from "../Container.jsx";

export default function ServicesSection({ data }) {
  const items = Array.isArray(data?.items) ? data.items : [];

  return (
    <section
      id="services"
      style={{
        padding: "110px 0 90px",
      }}
    >
      <Container wide>
        {/* HEADER */}
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

        {/* GRID */}
        <div
          className="services-solid-grid"
          style={{
            marginTop: 64,
          }}
        >
          {items.map((item, index) => (
            <ServiceCard
              key={`${item.title}-${index}`}
              index={index}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* CARD */
function ServiceCard({ index, title, desc }) {
  return (
    <div className="services-solid-card">
      {/* número */}
      <div
        style={{
          fontSize: 13,
          color: "var(--accentA)",
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        0{index + 1}
      </div>

      {/* contenido */}
      <div style={{ marginTop: 26 }}>
        <h3
          style={{
            margin: 0,
            fontSize: "clamp(24px, 2vw, 34px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            maxWidth: 280,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            marginTop: 18,
            marginBottom: 0,
            color: "color-mix(in srgb, var(--text) 65%, transparent)",
            fontSize: 15.5,
            lineHeight: 1.8,
            maxWidth: 300,
          }}
        >
          {desc}
        </p>
      </div>

      {/* línea inferior */}
      <div
        style={{
          marginTop: 28,
          width: 54,
          height: 2,
          borderRadius: 999,
          background: "linear-gradient(90deg, var(--accentA), transparent)",
          opacity: 0.9,
        }}
      />
    </div>
  );
}