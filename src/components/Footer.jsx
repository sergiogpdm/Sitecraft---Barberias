import Container from "./Container.jsx";
import Button from "./ui/Button.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

export default function Footer({ data, contact }) {
  const { config } = useSiteConfig();
  const { brand, links } = config;

  return (
    <footer
      id="footer"
      style={{
        padding: "70px 0 30px",
        borderTop: "1px solid var(--border)",
        background: "var(--card)", // 🔥 fondo sólido
      }}
    >
      <Container wide>
        <div className="footer-clean-shell">
          {/* TOP */}
          <div className="footer-clean-top">
            <div className="footer-clean-brand">
              
              {/* 🔥 LOGO / EMOJI */}
              <div className="footer-clean-mark">
                {brand.logoImage ? (
                  <img
                    src={brand.logoImage}
                    alt={brand.name}
                    className="footer-clean-logo"
                  />
                ) : (
                  <span className="footer-clean-emoji">
                    {brand.emojiLogo}
                  </span>
                )}
              </div>

              <div>
                <div className="footer-clean-name">
                  {data.title || brand.name}
                </div>

                <div className="footer-clean-subtitle">
                  {data.subtitle}
                </div>
              </div>
            </div>

            <div className="footer-clean-cta">
              <Button href={links.whatsapp} target="_blank" rel="noreferrer">
                Reservar cita
              </Button>
            </div>
          </div>

          {/* GRID */}
          <div className="footer-clean-grid">
            <div className="footer-clean-col">
              <div className="footer-clean-label">Ubicación</div>
              <div className="footer-clean-text">{contact.address}</div>

              {links.maps && (
                <a
                  href={links.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-clean-link"
                >
                  Ver en Maps
                </a>
              )}
            </div>

            <div className="footer-clean-col">
              <div className="footer-clean-label">Horario</div>
              <div className="footer-clean-text">{contact.hours}</div>
            </div>

            <div className="footer-clean-col">
              <div className="footer-clean-label">Contacto</div>
              <div className="footer-clean-text">{contact.phoneDisplay}</div>

              {links.instagram && (
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-clean-link"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>

          {/* BOTTOM */}
          <div className="footer-clean-bottom">
            <div className="footer-clean-small">{data.small}</div>

            <div className="footer-clean-nav">
              <a href="#hero">Inicio</a>
              <a href="#services">Servicios</a>
              <a href="#prices">Precios</a>
              <a href="#booking">Reservar</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}