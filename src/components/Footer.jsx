import Container from "./Container.jsx";
import Button from "./ui/Button.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

export default function Footer({ data, contact }) {
  const { config } = useSiteConfig();
  const { brand, links } = config;

  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="footer-clean">
      <Container wide>
        <div className="footer-clean-shell">
          <div className="footer-clean-main">
            <div className="footer-clean-brand">
              <div className="footer-clean-mark">
                {brand?.logoImage ? (
                  <img
                    src={brand.logoImage}
                    alt={brand?.name || "Logo"}
                    className="footer-clean-logo"
                  />
                ) : (
                  <span className="footer-clean-emoji">
                    {brand?.emojiLogo || "💈"}
                  </span>
                )}
              </div>

              <div className="footer-clean-brand-copy">
                <div className="footer-clean-name">
                  {data?.title || brand?.name}
                </div>

                {data?.subtitle ? (
                  <div className="footer-clean-subtitle">{data.subtitle}</div>
                ) : null}
              </div>
            </div>

            {links?.whatsapp ? (
              <div className="footer-clean-cta">
                <Button href={links.whatsapp} target="_blank" rel="noreferrer">
                  Reservar cita
                </Button>
              </div>
            ) : null}
          </div>

          <div className="footer-clean-grid">
            <FooterBlock
              label="Ubicación"
              value={contact?.address}
              link={links?.maps}
              linkLabel="Ver en Maps"
            />

            <FooterBlock label="Horario" value={contact?.hours} />

            <FooterBlock
              label="Contacto"
              value={contact?.phoneDisplay || contact?.phone}
              link={links?.instagram}
              linkLabel="Instagram"
            />
          </div>

          <div className="footer-clean-bottom">
            <div className="footer-clean-small">
              {data?.small || `© ${year} ${brand?.name || ""}`}
            </div>

            <div className="footer-clean-bottom-right">
              <nav className="footer-clean-nav" aria-label="Footer navigation">
                <a href="#hero">Inicio</a>
                <a href="#prices">Servicios</a>
                <a href="#testimonials">Opiniones</a>
                <a href="#booking">Reservar</a>
              </nav>

              <a
                className="footer-agency"
                href="https://www.noos-solutions.es"
                target="_blank"
                rel="noreferrer"
                aria-label="NOOS"
              >
                <span className="footer-agency-logo" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterBlock({ label, value, link, linkLabel }) {
  return (
    <div className="footer-clean-col">
      <div>
        <div className="footer-clean-label">{label}</div>
        {value ? <div className="footer-clean-text">{value}</div> : null}
      </div>

      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="footer-clean-link"
        >
          {linkLabel}
        </a>
      ) : null}
    </div>
  );
}