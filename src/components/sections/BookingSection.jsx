import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

export default function BookingSection({ data }) {
  const { config } = useSiteConfig();
  const { contact, links } = config;

  const sideImages = Array.isArray(data?.sideImages) ? data.sideImages : [];
  const leftImage = sideImages[0] || "";
  const rightImage = sideImages[1] || "";

  const bookingLink = resolveBookingLink(config, data);

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
            <div className="booking-convert-kicker">
              {data.kicker || "Reserva"}
            </div>

            <h2 className="booking-convert-title">
              {data.title || "Pide tu cita y déjanos el resto."}
            </h2>

            {data.desc ? (
              <p className="booking-convert-desc">{data.desc}</p>
            ) : null}

            <div className="booking-convert-points">
              <div className="booking-convert-point">
                <div className="booking-convert-point-label">Respuesta</div>
                <div className="booking-convert-point-value">Rápida</div>
              </div>

              <div className="booking-convert-point">
                <div className="booking-convert-point-label">Reserva</div>
                <div className="booking-convert-point-value">YA</div>
              </div>

              <div className="booking-convert-point">
                <div className="booking-convert-point-label">Horario</div>
                <div className="booking-convert-point-value">
                  {contact?.hours || "Flexible"}
                </div>
              </div>
            </div>

            <div className="booking-convert-actions">
              {bookingLink.href ? (
                <Button href={bookingLink.href} target="_blank" rel="noreferrer">
                  {bookingLink.label}
                </Button>
              ) : null}

              {links?.maps ? (
                <Button
                  href={links.maps}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                >
                  Ver ubicación
                </Button>
              ) : null}
            </div>

            <div className="booking-convert-note">
              {contact?.address ? <span>{contact.address}</span> : null}
              {contact?.phoneDisplay ? <span> · {contact.phoneDisplay}</span> : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function resolveBookingLink(config, data) {
  const type = config?.bookingPlatform?.type || "whatsapp";
  const platformUrl = config?.bookingPlatform?.url || "";
  const whatsappUrl = config?.links?.whatsapp || "";
  const dataHref = data?.ctaHref || "";
  const dataLabel = data?.ctaText || "Reservar";

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