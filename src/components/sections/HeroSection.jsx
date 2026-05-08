import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

export default function HeroSection({ brand: brandProp, data }) {
  const { config } = useSiteConfig();

  const brand = brandProp || config?.brand || {};
  const links = config?.links || {};
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

      <img
        src={brand?.logoImage || "/logos_id/logo_id21.png"}
        alt={brand?.name || "Logo"}
        className="hero-corner-logo-img"
      />

      <Container wide>
        <div className="hero-full-content">
          {data.badge && <div className="hero-full-badge">{data.badge}</div>}

          <h1 className="hero-full-title">
            <span>{data.titleA}</span>
            <span className="hero-full-highlight">
              {data.titleHighlight}
            </span>
          </h1>

          <div className="hero-full-subtitle-strong">{data.titleB}</div>

          <p className="hero-full-subtitle">{data.subtitle}</p>

          <div className="hero-full-actions">
            {booking.href && (
              <Button
                href={booking.href}
                target={booking.external ? "_blank" : undefined}
                rel={booking.external ? "noreferrer" : undefined}
              >
                {booking.label}
              </Button>
            )}

            <Button href="#prices" variant="secondary">
              Ver servicios
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function resolveBookingLink(config, data, links) {
  const type = config?.bookingPlatform?.type || "none";
  const url = config?.bookingPlatform?.url || "";

  if (type === "internal") {
    return {
      href: "#booking",
      label: config?.bookingPlatform?.label || "Reservar",
      external: false,
    };
  }

  if (type === "none") {
    return {
      href: links?.whatsapp || data?.ctaHref || "",
      label: "WhatsApp",
      external: true,
    };
  }

  if (type === "yeasy") {
    return {
      href: url,
      label: "Reservar en YEASY",
      external: true,
    };
  }

  if (type === "booksy") {
    return {
      href: url,
      label: "Reservar en Booksy",
      external: true,
    };
  }

  if (type === "custom") {
    return {
      href: url || data?.ctaHref || "",
      label: config?.bookingPlatform?.label || "Reservar",
      external: true,
    };
  }

  return {
    href: "",
    label: "",
    external: false,
  };
}