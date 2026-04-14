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

        <div
          style={{
            marginTop: 64,
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {items.map((item, index) => (
              <MinimalServiceBlock
                key={`${item.title}-${index}`}
                index={index}
                title={item.title}
                desc={item.desc}
                isLast={index === items.length - 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function MinimalServiceBlock({ index, title, desc, isLast }) {
  return (
    <div
      style={{
        padding: "42px 34px 38px",
        borderRight: isLast ? "none" : "1px solid var(--border)",
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontSize: 14,
          color: "var(--accentA)",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        0{index + 1}
      </div>

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
            color: "var(--muted)",
            fontSize: 15.5,
            lineHeight: 1.8,
            maxWidth: 300,
          }}
        >
          {desc}
        </p>
      </div>

      <div
        style={{
          marginTop: 28,
          width: 42,
          height: 1,
          background: "var(--accentA)",
          opacity: 0.8,
        }}
      />
    </div>
  );
}