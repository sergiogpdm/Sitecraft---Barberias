import { useMemo, useState } from "react";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import HeroSection from "../components/sections/HeroSection.jsx";
import PricesSection from "../components/sections/PricesSection.jsx";
import PhotoStripSection from "../components/sections/PhotoStripSection.jsx";
import BookingSection from "../components/sections/BookingSection.jsx";
import Footer from "../components/Footer.jsx";
import Container from "../components/Container.jsx";
import TestimonialsSection from "../components/sections/TestimonialsSection.jsx";
import InternalBookingForm from "../components/sections/InternalBookingForm.jsx";

export default function Home() {
  const { config } = useSiteConfig();
  const { brand, copy, contact, pages, links, layout, theme } = config;

  const [menuOpen, setMenuOpen] = useState(false);
  const [internalBookingOpen, setInternalBookingOpen] = useState(false);

  const enabledSections = [
    { id: "hero", label: "Inicio" },
    { id: "prices", label: "Servicios" },
    { id: "testimonials", label: "Opiniones" },
    { id: "photoStrip", label: "Galería" },
    { id: "booking", label: "Reservar" },
  ].filter((base) =>
    (pages.home.sections || []).some(
      (s) => s.id === base.id && s.enabled
    )
  );

  const externalBookingLink = resolveBookingLink(config);

  const navbarBookingLink = externalBookingLink.href
    ? externalBookingLink
    : {
      href: links?.whatsapp || "",
      label: "Reservar",
      platform: "custom",
      external: true,
    };

  const bgColor = theme?.overrides?.["--bg"] || "#0b0b0d";
  const borderColor = theme?.overrides?.["--border"] || "#26262b";

  const navbarStyle = useMemo(() => {
    return {
      background: makeAlphaColor(bgColor, 0.38),
      borderBottom: `1px solid ${makeAlphaColor(borderColor, 0.18)}`,
      boxShadow: "none",
      backdropFilter: "blur(10px)",
      transition: "all 0.25s ease",
    };
  }, [bgColor, borderColor]);

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* BACKGROUND */}
      <div className="site-bg-glow-left" />
      <div className="site-bg-glow-right" />
      <div className="site-bg-glow-top" />
      <div className="site-bg-glow-bottom" />
      <div className="site-bg-vignette" />

      {/* NAVBAR */}
      <header className="navbar-pro" style={navbarStyle}>
        <Container
          wide
          style={{
            maxWidth: "1600px",
            padding: "0 40px",
          }}
        >
          <div className="navbar-pro-inner">
            <a href="#hero" className="navbar-pro-brand">
              <div className="navbar-pro-brand-mark">
                {brand.logoImage ? (
                  <img
                    src={brand.logoImage}
                    alt={brand.name}
                    className="navbar-pro-logo-clean"
                  />
                ) : (
                  <span className="navbar-pro-logo-emoji">
                    {brand.emojiLogo}
                  </span>
                )}
              </div>

              <div>
                <div className="navbar-pro-brand-name">{brand.name}</div>
                <div className="navbar-pro-brand-tagline">
                  {brand.tagline}
                </div>
              </div>
            </a>

            <nav className="navbar-pro-links desktop-only">
              {enabledSections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.label}
                </a>
              ))}

              {layout.showNavbarCta && navbarBookingLink.href && (
                <a
                  href={navbarBookingLink.href}
                  target={navbarBookingLink.external ? "_blank" : undefined}
                  rel={navbarBookingLink.external ? "noreferrer" : undefined}
                  className={`booking-platform-btn booking-platform-btn-${navbarBookingLink.platform}`}
                >
                  {navbarBookingLink.label}
                </a>
              )}
            </nav>

            <button
              className={`navbar-pro-toggle mobile-only ${menuOpen ? "is-open" : ""
                }`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <div
            className={`mobile-drawer-overlay mobile-only ${menuOpen ? "is-open" : ""
              }`}
            onClick={() => setMenuOpen(false)}
          >
            <aside
              className={`mobile-drawer ${menuOpen ? "is-open" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-drawer-head">
                <a
                  href="#hero"
                  className="mobile-drawer-brand"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="mobile-drawer-logo">
                    {brand.logoImage ? (
                      <img src={brand.logoImage} alt={brand.name} />
                    ) : (
                      <span>{brand.emojiLogo}</span>
                    )}
                  </div>

                  <div>
                    <div className="mobile-drawer-name">{brand.name}</div>
                    <div className="mobile-drawer-sub">Menú</div>
                  </div>
                </a>
              </div>

              <div className="mobile-drawer-body">
                <div className="mobile-drawer-label">Secciones</div>

                <nav className="mobile-drawer-links">
                  {enabledSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="mobile-drawer-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {section.label}
                    </a>
                  ))}

                  {layout.showNavbarCta && navbarBookingLink.href && (
                    <a
                      href={navbarBookingLink.href}
                      target={navbarBookingLink.external ? "_blank" : undefined}
                      rel={navbarBookingLink.external ? "noreferrer" : undefined}
                      className={`mobile-drawer-cta booking-platform-btn booking-platform-btn-${navbarBookingLink.platform}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {navbarBookingLink.label}
                    </a>
                  )}
                </nav>
              </div>
            </aside>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <div id="hero">
        <HeroSection brand={brand} data={copy.hero} />
      </div>

      {/* SERVICIOS */}
      <div id="prices">
        <PricesSection data={copy.prices} />
      </div>

      {/* TESTIMONIOS + GALERIA */}
      <section style={{ padding: "110px 0 95px" }}>
        <Container wide>
          <div className="testimonials-gallery-split">
            <PhotoStripSection data={copy.photoStrip} compact />
            <TestimonialsSection data={copy.testimonials} compact />
          </div>
        </Container>
      </section>

      {/* BOOKING */}
      <div id="booking">
        <BookingSection data={copy.booking} />
      </div>

      <Footer data={copy.footer} contact={contact} />

      {/* FLOATING BOOKING */}
      {layout.showFloatingBooking && externalBookingLink.href && (
        <>
          <a
            href={externalBookingLink.platform === "internal" ? "#" : externalBookingLink.href}
            target={externalBookingLink.external ? "_blank" : undefined}
            rel={externalBookingLink.external ? "noreferrer" : undefined}
            className={`floating-booking-btn floating-booking-btn-${externalBookingLink.platform}`}
            onClick={(e) => {
              if (externalBookingLink.platform === "internal") {
                e.preventDefault();
                setInternalBookingOpen(true);
              }
            }}
          >
            <span className="floating-btn-text">
              {externalBookingLink.label}
            </span>

            <span className="floating-btn-icon">
              {externalBookingLink.platform === "booksy" && (
                <img src="/logos/booksy.png" alt="Booksy" />
              )}
              {externalBookingLink.platform === "yeasy" && (
                <img src="/logos/yeasy.png" alt="Yeasy" />
              )}
              {externalBookingLink.platform === "custom" && (
                <img src="/logos/custom.png" alt="Reservar" />
              )}
              {externalBookingLink.platform === "internal" && (
                <img src="/logos/custom.png" alt="Reservar" />
              )}
            </span>
          </a>

          {internalBookingOpen && (
            <InternalBookingForm
              services={copy?.prices?.items || []}
              onClose={() => setInternalBookingOpen(false)}
            />
          )}
        </>
      )}

      {/* FLOATING WHATSAPP */}
      {layout.showFloatingWhatsApp && links.whatsapp && (
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="floating-whatsapp-btn"
        >
          <span className="floating-btn-text">WhatsApp</span>

          <span className="floating-btn-icon">
            <img src="/logos/whatsapp.png" alt="WhatsApp" />
          </span>
        </a>
      )}
    </main>
  );
}

/* helpers */

function makeAlphaColor(color, alpha) {
  if (!color) return `rgba(0,0,0,${alpha})`;

  if (color.startsWith("#")) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return color;
}

function resolveBookingLink(config) {
  const type = config?.bookingPlatform?.type || "none";
  const url = config?.bookingPlatform?.url || "";

  if (type === "internal") {
    return {
      href: "#booking",
      label: config?.bookingPlatform?.label || "Reservar",
      platform: "internal",
      external: false,
    };
  }

  if (type === "yeasy") {
    return {
      href: url,
      label: "Yeasy",
      platform: "yeasy",
      external: true,
    };
  }

  if (type === "booksy") {
    return {
      href: url,
      label: "Booksy",
      platform: "booksy",
      external: true,
    };
  }

  if (type === "custom") {
    return {
      href: url,
      label: config?.bookingPlatform?.label || "Reservar",
      platform: "custom",
      external: true,
    };
  }

  return {
    href: "",
    label: "",
    platform: "none",
    external: false,
  };
}