import Container from "./Container.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

export default function Footer({ data, contact }) {
  const { config } = useSiteConfig();
  const { brand, links } = config;

  return (
    <footer id="footer" className="footer-compact">
      <Container wide>
        <div className="footer-compact-shell">
          <div className="footer-compact-top">
            <div className="footer-compact-brand">
              {brand?.logoImage ? (
                <img
                  src={brand.logoImage}
                  alt={brand?.name || "Logo"}
                  className="footer-compact-brand-logo"
                />
              ) : (
                <>
                  <div className="footer-compact-name">
                    {data?.title || brand?.name}
                  </div>

                  {data?.subtitle ? (
                    <div className="footer-compact-subtitle">{data.subtitle}</div>
                  ) : null}
                </>
              )}
            </div>

            <div className="footer-compact-info">
              <FooterInfo label="Ubicación" value={contact?.address} link={links?.maps} />
              <FooterInfo label="Horario" value={contact?.hours} />
              <FooterInfo
                label="Contacto"
                value={contact?.phoneDisplay || contact?.phone}
                link={links?.instagram}
              />
            </div>

            <nav className="footer-compact-nav" aria-label="Footer navigation">
              <a href="#hero">Inicio</a>
              <a href="#prices">Servicios</a>
              <a href="#testimonials">Opiniones</a>
              <a href="#booking">Reservar</a>
            </nav>
          </div>

          <a
            className="footer-compact-agency"
            href="https://www.noos-solutions.es"
            target="_blank"
            rel="noreferrer"
            aria-label="NOOS"
          >
            <span className="footer-compact-agency-logo" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}

function FooterInfo({ label, value, link }) {
  const content = (
    <>
      <div className="footer-compact-label">{label}</div>
      <div className="footer-compact-value">{value || "—"}</div>
    </>
  );

  return link ? (
    <a className="footer-compact-info-item" href={link} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <div className="footer-compact-info-item">{content}</div>
  );
}