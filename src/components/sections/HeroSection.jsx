import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";

export default function HeroSection({ brand, data }) {
  return (
    <section style={{ padding: "60px 0 40px" }}>
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ color: "var(--accentA)", marginBottom: 12 }}>
              {data.badge}
            </div>

            <h1
              style={{
                fontFamily: "var(--fontDisplay)",
                fontSize: "clamp(40px, 7vw, 64px)",
                lineHeight: 1.02,
                margin: 0,
              }}
            >
              {data.titleA}{" "}
              <span style={{ color: "var(--accentA)" }}>
                {data.titleHighlight}
              </span>
              <br />
              {data.titleB}
            </h1>

            <p
              style={{
                color: "var(--muted)",
                fontSize: 18,
                marginTop: 18,
                maxWidth: 620,
              }}
            >
              {data.subtitle}
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
              <Button href={data.ctaHref} target="_blank" rel="noreferrer">
                {data.ctaText}
              </Button>
            </div>
          </div>

          <img
            src={data.imageSrc}
            alt={brand.name}
            style={{
              width: "100%",
              minHeight: 420,
              objectFit: "cover",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
            }}
          />
        </div>
      </Container>
    </section>
  );
}