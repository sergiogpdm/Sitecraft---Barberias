import { useEffect, useMemo, useState } from "react";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import HeroSection from "../components/sections/HeroSection.jsx";
import ServicesSection from "../components/sections/ServicesSection.jsx";
import PricesSection from "../components/sections/PricesSection.jsx";
import PhotoStripSection from "../components/sections/PhotoStripSection.jsx";
import BookingSection from "../components/sections/BookingSection.jsx";
import Footer from "../components/Footer.jsx";
import Container from "../components/Container.jsx";
import Button from "../components/ui/Button.jsx";
import TestimonialsSection from "../components/sections/TestimonialsSection.jsx";

export default function Home() {
  const { config } = useSiteConfig();
  const { brand, copy, contact, pages, links, layout, theme } = config;

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const enabledSections = pages.home.sections.filter((s) => s.enabled);
  const bookingLink = resolveBookingLink(config, copy?.booking);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bgColor = theme?.overrides?.["--bg"] || "#0b0b0d";
  const cardColor = theme?.overrides?.["--card"] || "#141418";
  const borderColor = theme?.overrides?.["--border"] || "#26262b";

  const navbarStyle = useMemo(() => {
    return {
      background: isScrolled
        ? makeAlphaColor(cardColor, 0.88)
        : makeAlphaColor(bgColor, 0.38),
      borderBottom: isScrolled
        ? `1px solid ${makeAlphaColor(borderColor, 0.9)}`
        : `1px solid ${makeAlphaColor(borderColor, 0.18)}`,
      boxShadow: isScrolled
        ? "0 12px 34px rgba(0,0,0,0.10)"
        : "0 0 0 rgba(0,0,0,0)",
      backdropFilter: isScrolled ? "blur(16px)" : "blur(10px)",
      WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(10px)",
      transition:
        "background 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, backdrop-filter 0.28s ease",
    };
  }, [isScrolled, bgColor, cardColor, borderColor]);

  return (
    <main style={{ minHeight: "100vh" }}>
      <div className="site-bg-glow-left" />
      <div className="site-bg-glow-right" />
      <div className="site-bg-glow-top" />
      <div className="site-bg-glow-bottom" />
      <div className="site-bg-vignette" />

      <header className={`navbar-pro ${isScrolled ? "is-scrolled" : "is-top"}`} style={navbarStyle}>
        <Container wide>
          <div className="navbar-pro-inner">
            <a href="#hero" className="navbar-pro-brand">
              <div className="navbar-pro-brand-mark">
                {brand.logoImage ? (
                  <img
                    src={brand.logoImage}
                    alt={brand.name}
                    className="navbar-pro-logo-image"
                  />
                ) : (
                  <span className="navbar-pro-logo-emoji">
                    {brand.emojiLogo}
                  </span>
                )}
              </div>

              <div className="navbar-pro-brand-text">
                <div className="navbar-pro-brand-name">{brand.name}</div>
                <div className="navbar-pro-brand-tagline">{brand.tagline}</div>
              </div>
            </a>

            <nav className="navbar-pro-links desktop-only">
              {enabledSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="navbar-pro-link"
                >
                  {section.label || section.id}
                </a>
              ))}

              {layout.showNavbarCta && bookingLink.href && (
                <Button href={bookingLink.href} target="_blank" rel="noreferrer">
                  {bookingLink.label}
                </Button>
              )}
            </nav>

            <button
              className="navbar-pro-toggle mobile-only"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          {menuOpen && (
            <div className="navbar-pro-mobile-panel mobile-only">
              <div className="navbar-pro-mobile-links">
                {enabledSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="navbar-pro-mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {section.label || section.id}
                  </a>
                ))}

                {layout.showNavbarCta && bookingLink.href && (
                  <div style={{ marginTop: 8 }}>
                    <Button href={bookingLink.href} target="_blank" rel="noreferrer">
                      {bookingLink.label}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>
      </header>

      <div id="hero">
        {enabledSections.some((s) => s.id === "hero") && (
          <HeroSection brand={brand} data={copy.hero} />
        )}
      </div>

      <div id="services">
        {enabledSections.some((s) => s.id === "services") && (
          <ServicesSection data={copy.services} />
        )}
      </div>

      {(enabledSections.some((s) => s.id === "testimonials") ||
        enabledSections.some((s) => s.id === "photoStrip")) && (
        <section
          style={{
            padding: "110px 0 95px",
          }}
        >
          <Container wide>
            <div className="testimonials-gallery-split">
              <div id="photoStrip">
                {enabledSections.some((s) => s.id === "photoStrip") && (
                  <PhotoStripSection data={copy.photoStrip} compact />
                )}
              </div>

              <div id="testimonials">
                {enabledSections.some((s) => s.id === "testimonials") && (
                  <TestimonialsSection data={copy.testimonials} compact />
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      <div id="prices">
        {enabledSections.some((s) => s.id === "prices") && (
          <PricesSection data={copy.prices} />
        )}
      </div>

      <div id="booking">
        {enabledSections.some((s) => s.id === "booking") && (
          <BookingSection data={copy.booking} />
        )}
      </div>

      <Footer data={copy.footer} contact={contact} />

      {layout.showFloatingBooking &&
        bookingLink.href &&
        config?.bookingPlatform?.type !== "none" && (
          <a
            href={bookingLink.href}
            target="_blank"
            rel="noreferrer"
            className="floating-booking-btn"
          >
            {bookingLink.label}
          </a>
        )}

      {layout.showFloatingWhatsApp && links.whatsapp && (
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noreferrer"
          style={{
            position: "fixed",
            right: 18,
            bottom: 18,
            zIndex: 40,
            background: "#25D366",
            color: "#111",
            fontWeight: 800,
            borderRadius: 999,
            padding: "14px 18px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          WhatsApp
        </a>
      )}
    </main>
  );
}

function makeAlphaColor(color, alpha) {
  if (!color) return `rgba(0,0,0,${alpha})`;

  const c = String(color).trim();

  if (c.startsWith("#")) {
    let hex = c.slice(1);

    if (hex.length === 3) {
      hex = hex.split("").map((x) => x + x).join("");
    }

    if (hex.length !== 6) return color;

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (c.startsWith("rgb(")) {
    return c.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  }

  if (c.startsWith("rgba(")) {
    return c.replace(/rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/, `rgba($1,$2,$3,${alpha})`);
  }

  return color;
}

function resolveBookingLink(config, bookingData) {
  const type = config?.bookingPlatform?.type || "whatsapp";
  const platformUrl = config?.bookingPlatform?.url || "";
  const whatsappUrl = config?.links?.whatsapp || "";
  const dataHref = bookingData?.ctaHref || "";
  const dataLabel = bookingData?.ctaText || "Reservar";

  if (type === "none") {
    return {
      href: "",
      label: config?.bookingPlatform?.label || dataLabel,
    };
  }

  const href =
    platformUrl ||
    whatsappUrl ||
    dataHref ||
    "";

  let label = config?.bookingPlatform?.label || dataLabel;

  if (!config?.bookingPlatform?.label) {
    if (type === "yeasy") label = "Reservar en Yeasy";
    else if (type === "booksy") label = "Reservar en Booksy";
    else if (type === "custom") label = "Reservar";
    else label = dataLabel;
  }

  return { href, label };
}