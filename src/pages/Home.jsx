import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import HeroSection from "../components/sections/HeroSection.jsx";
import ServicesSection from "../components/sections/ServicesSection.jsx";
import PricesSection from "../components/sections/PricesSection.jsx";
import PhotoStripSection from "../components/sections/PhotoStripSection.jsx";
import BookingSection from "../components/sections/BookingSection.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const { config } = useSiteConfig();
  const { brand, copy, contact, pages, links, layout } = config;

  const enabledSections = pages.home.sections.filter((s) => s.enabled);

  return (
    <main style={{ minHeight: "100vh" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(10px)",
          background: "rgba(11,11,13,0.85)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong>
              {brand.emojiLogo} {brand.name}
            </strong>
            <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>
              {brand.tagline}
            </div>
          </div>

          <nav style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            {enabledSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} style={{ color: "var(--muted)" }}>
                {section.label || section.id}
              </a>
            ))}

            {layout.showNavbarCta && (
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "var(--accentA)",
                  color: "#111",
                  padding: "10px 14px",
                  borderRadius: "var(--btnRadius)",
                  fontWeight: 700,
                }}
              >
                Reservar
              </a>
            )}
          </nav>
        </div>
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

      <div id="photoStrip">
        {enabledSections.some((s) => s.id === "photoStrip") && (
          <PhotoStripSection data={copy.photoStrip} />
        )}
      </div>

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

      {layout.showFloatingWhatsApp && (
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noreferrer"
          style={{
            position: "fixed",
            right: 18,
            bottom: 18,
            zIndex: 30,
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