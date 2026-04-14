import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";

export default function HeroSection({ brand, data }) {
  return (
    <section
      id="hero"
      className="hero-full-bg"
      style={{
        backgroundImage: `url(${data.imageSrc})`,
      }}
    >
      <div className="hero-full-overlay" />

      <Container wide>
        <div className="hero-full-content">
          {data.badge && (
            <div className="hero-full-badge">{data.badge}</div>
          )}

          <h1 className="hero-full-title">
            <span>{data.titleA}</span>
            <span className="hero-full-highlight">
              {data.titleHighlight}
            </span>
          </h1>

          <div className="hero-full-subtitle-strong">
            {data.titleB}
          </div>

          <p className="hero-full-subtitle">
            {data.subtitle}
          </p>

          <div className="hero-full-actions">
            <Button href={data.ctaHref} target="_blank">
              {data.ctaText}
            </Button>

            <Button
              href="#services"
              variant="secondary"
              style={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.25)",
                background: "rgba(0,0,0,0.25)"
              }}
            >
              Ver servicios
            </Button>
          </div>

          <div className="hero-full-trust">
            <HeroTag>Reserva rápida</HeroTag>
            <HeroTag>Atención directa</HeroTag>
            <HeroTag>Corte y barba</HeroTag>
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroTag({ children }) {
  return <div className="hero-full-tag">{children}</div>;
}