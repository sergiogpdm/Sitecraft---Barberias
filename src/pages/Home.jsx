import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import HeroSection from "../components/sections/HeroSection.jsx";
import ServicesSection from "../components/sections/ServicesSection.jsx";
import PricesSection from "../components/sections/PricesSection.jsx";
import PhotoStripSection from "../components/sections/PhotoStripSection.jsx";
import BookingSection from "../components/sections/BookingSection.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const { config } = useSiteConfig();
  const { brand, copy, contact, pages } = config;

  const enabledSections = new Set(
    (pages.home.sections || []).filter((s) => s.enabled).map((s) => s.id)
  );

  return (
    <main style={{ minHeight: "100vh" }}>
      {enabledSections.has("hero") && (
        <HeroSection brand={brand} data={copy.hero} />
      )}

      {enabledSections.has("services") && (
        <ServicesSection data={copy.services} />
      )}

      {enabledSections.has("photoStrip") && (
        <PhotoStripSection data={copy.photoStrip} />
      )}

      {enabledSections.has("prices") && (
        <PricesSection data={copy.prices} />
      )}

      {enabledSections.has("booking") && (
        <BookingSection data={copy.booking} />
      )}

      <Footer data={copy.footer} contact={contact} />
    </main>
  );
}