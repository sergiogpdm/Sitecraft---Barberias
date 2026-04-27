import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

export default function HeroSection({ brand, data }) {
  const { config } = useSiteConfig();
  const { links } = config;

  const booking = resolveBookingLink(config, data, links);

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

          {/* 🔥 BOTONES */}
          <div className="hero-full-actions">
            {booking.href && (
              <Button href={booking.href} target="_blank">
                {booking.label}
              </Button>
            )}

            <Button
              href="#prices" // 🔥 CAMBIO CLAVE
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

          {false && (
            <div className="hero-full-trust">
              <HeroTag>Reserva rápida</HeroTag>
              <HeroTag>Atención directa</HeroTag>
              <HeroTag>Corte y barba</HeroTag>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/* =========================
   🔥 LÓGICA DE RESERVA
========================= */

function resolveBookingLink(config, data, links) {
  const type = config?.bookingPlatform?.type || "none";
  const url = config?.bookingPlatform?.url || "";

  // 🔥 WHATSAPP SIEMPRE DISPONIBLE
  if (type === "none") {
    return {
      href: links?.whatsapp || data?.ctaHref || "",
      label: "WhatsApp",
    };
  }

  if (type === "yeasy") {
    return {
      href: url,
      label: "Reservar en Yeasy",
    };
  }

  if (type === "booksy") {
    return {
      href: url,
      label: "Reservar en Booksy",
    };
  }

  if (type === "custom") {
    return {
      href: url || data?.ctaHref || "",
      label: config?.bookingPlatform?.label || "Reservar",
    };
  }

  return {
    href: "",
    label: "",
  };
}

/* ========================= */

function HeroTag({ children }) {
  return <div className="hero-full-tag">{children}</div>;
}