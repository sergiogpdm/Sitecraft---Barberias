import Container from "../Container.jsx";

export default function PhotoStripSection({ data, compact = false }) {
  const photos = Array.isArray(data?.photos) ? data.photos : [];

  return (
    <section
      id="photoStrip"
      style={{
        padding: compact ? "0" : "100px 0 90px",
        overflow: "hidden",
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

          {data.note ? (
            <p
              style={{
                margin: "18px 0 0",
                maxWidth: compact ? 520 : 700,
                color: "var(--muted)",
                fontSize: compact ? 16 : 18,
                lineHeight: 1.8,
              }}
            >
              {data.note}
            </p>
          ) : null}
        </div>

        <div
          style={{
            marginTop: compact ? 30 : 56,
          }}
        >
          <div className={`photo-runway-wrap ${compact ? "is-compact" : ""}`}>
            <div className={`photo-runway-track ${compact ? "is-compact" : ""}`}>
              {photos.map((src, index) => (
                <div
                  key={index}
                  className={`photo-runway-card ${
                    index === 1 ? "is-featured" : ""
                  } ${compact ? "is-compact" : ""}`}
                >
                  <img
                    src={src}
                    alt={`Trabajo ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}