import { useState } from "react";
import Container from "../Container.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";
import InternalBookingForm from "./InternalBookingForm.jsx";

export default function BookingSection({ data }) {
  const [internalBookingOpen, setInternalBookingOpen] = useState(false);

  const { config } = useSiteConfig();
  const { contact, links } = config;

  const bookingLink = resolveBookingLink(config, data);
  const isInternalBooking = config?.bookingPlatform?.type === "internal";

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
                <div className="booking-convert-point-value">
                  {isInternalBooking ? "Automática" : "Rápida"}
                </div>
                <div className="booking-convert-point-sub">
                  {isInternalBooking
                    ? "Tu reserva queda registrada al momento."
                    : "Te respondemos al instante."}
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
                isInternalBooking ? (
                  <button
                    type="button"
                    onClick={() => setInternalBookingOpen(true)}
                    className={`booking-platform-btn booking-platform-btn-${bookingLink.platform} booking-platform-btn-wide`}
                  >
                    {bookingLink.label}
                  </button>
                ) : (
                  <a
                    href={bookingLink.href}
                    target={bookingLink.external ? "_blank" : undefined}
                    rel={bookingLink.external ? "noreferrer" : undefined}
                    className={`booking-platform-btn booking-platform-btn-${bookingLink.platform} booking-platform-btn-wide`}
                  >
                    {bookingLink.label}
                  </a>
                )
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

      {internalBookingOpen ? (
        <InternalBookingForm
          services={config?.copy?.prices?.items || []}
          onClose={() => setInternalBookingOpen(false)}
        />
      ) : null}
    </section>
  );
}

function resolveBookingLink(config, data) {
  const type = config?.bookingPlatform?.type || "none";
  const platformUrl = config?.bookingPlatform?.url || "";
  const whatsappUrl = config?.links?.whatsapp || "";
  const dataHref = data?.ctaHref || "";

  if (type === "internal") {
    return {
      href: "#",
      label: config?.bookingPlatform?.label || "Reservar cita",
      platform: "internal",
      external: false,
    };
  }

  if (type === "yeasy") {
    return {
      href: platformUrl,
      label: "Yeasy",
      platform: "yeasy",
      external: true,
    };
  }

  if (type === "booksy") {
    return {
      href: platformUrl,
      label: "Booksy",
      platform: "booksy",
      external: true,
    };
  }

  if (type === "custom") {
    return {
      href: platformUrl || dataHref,
      label: config?.bookingPlatform?.label || "Reservar",
      platform: "custom",
      external: true,
    };
  }

  return {
    href: whatsappUrl || dataHref,
    label: "WhatsApp",
    platform: "whatsapp",
    external: true,
  };
}

function getBookingPlatformLabel(config) {
  const type = config?.bookingPlatform?.type || "none";

  if (type === "internal") return "En la web";
  if (type === "yeasy") return "En Yeasy";
  if (type === "booksy") return "En Booksy";
  if (type === "custom") return "Online";

  return "Por WhatsApp";
}