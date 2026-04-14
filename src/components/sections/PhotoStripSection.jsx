import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";

export default function PhotoStripSection({ data }) {
  const photos = Array.isArray(data?.photos) ? data.photos.filter(Boolean) : [];

  return (
    <section
      id="photoStrip"
      style={{
        padding: "100px 0 90px",
        overflow: "visible",
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

          {data.note ? (
            <p
              style={{
                margin: "22px auto 0",
                maxWidth: 680,
                color: "var(--muted)",
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              {data.note}
            </p>
          ) : null}
        </div>

        <div
          className="photo-runway-wrap"
          style={{
            marginTop: 56,
          }}
        >
          <div className="photo-runway-track" tabIndex={0}>
            {photos.map((photo, index) => (
              <RunwayPhotoCard
                key={`${photo}-${index}`}
                src={photo}
                alt={`Trabajo ${index + 1}`}
                index={index}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <Button href="#booking" variant="secondary">
            Reservar cita
          </Button>
        </div>
      </Container>
    </section>
  );
}

function RunwayPhotoCard({ src, alt, index }) {
  const desktopTransforms = [
    "rotate(-2deg)",
    "rotate(1.5deg)",
    "rotate(-1deg)",
    "rotate(2deg)",
    "rotate(-1.5deg)",
    "rotate(1deg)",
  ];

  const desktopHeights = [360, 420, 390, 440, 380, 410];
  const transform = desktopTransforms[index % desktopTransforms.length];
  const height = desktopHeights[index % desktopHeights.length];
  const featured = index === 1 || index === 3;

  return (
    <div
      className={`photo-runway-card ${featured ? "is-featured" : ""}`}
      style={{
        height,
        transform,
        border: featured
          ? "1px solid rgba(212,175,55,0.20)"
          : "1px solid var(--border)",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.18), rgba(0,0,0,0.03) 35%, rgba(0,0,0,0))",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 14,
          bottom: 14,
          width: 42,
          height: 1,
          background: featured ? "var(--accentA)" : "rgba(255,255,255,0.65)",
          opacity: 0.9,
        }}
      />
    </div>
  );
}