import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";

export default function HeroSection({ brand, data }) {
  return (
    <section
      style={{
        padding: "100px 0 80px",
        position: "relative",
      }}
    >
      <Container wide>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* TEXTO */}
          <div>
            <div
              style={{
                color: "var(--accentA)",
                fontWeight: 700,
                marginBottom: 18,
                letterSpacing: "0.05em",
              }}
            >
              {data.badge}
            </div>

            <h1
              style={{
                margin: 0,
                fontFamily: "var(--fontDisplay)",
                fontSize: "clamp(56px, 7vw, 90px)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
              }}
            >
              {data.titleA}
              <br />
              <span style={{ color: "var(--accentA)" }}>
                {data.titleHighlight}
              </span>
            </h1>

            <h2
              style={{
                marginTop: 16,
                fontSize: "clamp(22px, 2.5vw, 32px)",
                fontWeight: 500,
                color: "var(--text)",
                opacity: 0.9,
              }}
            >
              {data.titleB}
            </h2>

            <p
              style={{
                marginTop: 24,
                fontSize: 18,
                color: "var(--muted)",
                maxWidth: 520,
                lineHeight: 1.7,
              }}
            >
              {data.subtitle}
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: 14,
                marginTop: 32,
                flexWrap: "wrap",
              }}
            >
              <Button href={data.ctaHref} target="_blank">
                {data.ctaText}
              </Button>

              <Button variant="secondary" href="#services">
                Ver servicios
              </Button>
            </div>
          </div>

          {/* IMAGEN */}
          <div>
            <div
              style={{
                position: "relative",
                borderRadius: 24,
                overflow: "hidden",
                height: 560,
              }}
            >
              <img
                src={data.imageSrc}
                alt={brand.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* overlay suave */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                }}
              />

              {/* texto sobre imagen */}
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  color: "#fff",
                }}
              >
                <div style={{ opacity: 0.7, fontSize: 14 }}>
                  {brand.tagline}
                </div>

                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    marginTop: 4,
                  }}
                >
                  {brand.emojiLogo} {brand.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}