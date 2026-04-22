import Container from "../Container.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

export default function BookingSection({ data }) {
  const { config } = useSiteConfig();
  const { contact, links } = config;

  const bookingLink = resolveBookingLink(config, data);

  const sideImages = Array.isArray(data?.sideImages) ? data.sideImages : [];
  const leftImage = sideImages[0] || "";
  const rightImage = sideImages[1] || "";

  return (
    <section
      id="booking"
      style={{
        padding: "55px 0 100px",
        position: "relative",
      }}
    >
      <Container wide>
        <div className="booking-stage">
          {leftImage ? (
            <div className="booking-side-card booking-side-card-left">
              <img src={leftImage} alt="Reserva izquierda" />
            </div>
          ) : null}

          {rightImage ? (
            <div className="booking-side-card booking-side-card-right">
              <img src={rightImage} alt="Reserva derecha" />
            </div>
          ) : null}

          <div className="booking-convert-card">
            <div className="booking-convert-kicker-wrap">
              <div className="booking-convert-kicker">
                {data.kicker || "Reserva"}
              </div>
            </div>

            <h2 className="booking-convert-title">
              {data.title || "Pide tu cita y déjanos el resto."}
            </h2>

            {data.desc ? (
              <p className="booking-convert-desc">{data.desc}</p>
            ) : null}

            <div className="booking-convert-points booking-convert-points-v2">
              <div className="booking-convert-point booking-convert-point-v2">
                <div className="booking-point-icon">⚡</div>
                <div className="booking-convert-point-label">Respuesta</div>
                <div className="booking-convert-point-value">Rápida</div>
                <div className="booking-convert-point-sub">
                  Te respondemos al instante.
                </div>
              </div>

              <div className="booking-convert-point booking-convert-point-v2">
                <div className="booking-point-icon">📅</div>
                <div className="booking-convert-point-label">Reserva</div>
                <div className="booking-convert-point-value">
                  {getBookingPlatformLabel(config)}
                </div>
                <div className="booking-convert-point-sub">
                  Reserva online en segundos.
                </div>
              </div>

              <div className="booking-convert-point booking-convert-point-v2">
                <div className="booking-point-icon">🕒</div>
                <div className="booking-convert-point-label">Horario</div>
                <div className="booking-convert-point-value">
                  {contact?.hours || "Flexible"}
                </div>
                <div className="booking-convert-point-sub">
                  Atendemos durante todo el día.
                </div>
              </div>
            </div>

            <div className="booking-actions-divider">
              <span>✂</span>
            </div>

            <div className="booking-convert-actions booking-convert-actions-v2">
              {bookingLink.href ? (
                <a
                  href={bookingLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`booking-platform-btn booking-platform-btn-${bookingLink.platform} booking-platform-btn-wide`}
                >
                  {bookingLink.label}
                </a>
              ) : null}

              {links?.maps ? (
                <a
                  href={links.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="booking-platform-btn booking-platform-btn-secondary booking-platform-btn-wide"
                >
                  Ver ubicación
                </a>
              ) : null}
            </div>

            <div className="booking-convert-note booking-convert-note-v2">
              {contact?.address ? (
                <span className="booking-location-chip">
                  📍 {contact.address}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function resolveBookingLink(config, data) {
  const type = config?.bookingPlatform?.type || "none";
  const platformUrl = config?.bookingPlatform?.url || "";
  const whatsappUrl = config?.links?.whatsapp || "";
  const dataHref = data?.ctaHref || "";

  if (type === "yeasy") {
    return {
      href: platformUrl,
      label: "Yeasy",
      platform: "yeasy",
    };
  }

  if (type === "booksy") {
    return {
      href: platformUrl,
      label: "Booksy",
      platform: "booksy",
    };
  }

  if (type === "custom") {
    return {
      href: platformUrl || dataHref,
      label: config?.bookingPlatform?.label || "Reservar",
      platform: "custom",
    };
  }

  return {
    href: whatsappUrl || dataHref,
    label: "WhatsApp",
    platform: "whatsapp",
  };
}

function getBookingPlatformLabel(config) {
  const type = config?.bookingPlatform?.type || "none";

  if (type === "yeasy") return "En Yeasy";
  if (type === "booksy") return "En Booksy";
  if (type === "custom") return "Online";
  return "Por WhatsApp";
}