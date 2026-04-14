import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";

export default function BookingSection({ data }) {
  return (
    <section
      id="booking"
      style={{
        padding: "110px 0 120px",
      }}
    >
      <Container wide>
        <div className="booking-spotlight-wrap">
          <div className="booking-spotlight-glow" />

          <div className="booking-spotlight-card">
            <div className="booking-spotlight-topline" />

            {data.kicker ? (
              <div className="booking-spotlight-kicker">
                {data.kicker}
              </div>
            ) : null}

            <h2 className="booking-spotlight-title">
              {data.title}
            </h2>

            {data.desc ? (
              <p className="booking-spotlight-desc">
                {data.desc}
              </p>
            ) : null}

            <div className="booking-spotlight-tags">
              <BookingBadge>Respuesta rápida</BookingBadge>
              <BookingBadge>WhatsApp directo</BookingBadge>
              <BookingBadge>Reserva sin complicaciones</BookingBadge>
            </div>

            <div className="booking-spotlight-steps">
              <BookingStep
                number="01"
                title="Escríbenos"
                text="Abres WhatsApp y nos dices qué necesitas."
              />
              <BookingStep
                number="02"
                title="Te orientamos"
                text="Te proponemos la mejor hora y servicio."
              />
              <BookingStep
                number="03"
                title="Queda reservado"
                text="Te confirmamos la cita de forma rápida."
              />
            </div>

            <div className="booking-spotlight-cta">
              <Button href={data.ctaHref} target="_blank" rel="noreferrer">
                {data.ctaText}
              </Button>
            </div>

            <div className="booking-spotlight-note">
              Reserva en menos de un minuto y recibe confirmación directa.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function BookingBadge({ children }) {
  return (
    <div className="booking-badge">
      {children}
    </div>
  );
}

function BookingStep({ number, title, text }) {
  return (
    <div className="booking-step-v2">
      <div className="booking-step-v2-number">{number}</div>

      <div className="booking-step-v2-content">
        <div className="booking-step-v2-title">{title}</div>
        <div className="booking-step-v2-text">{text}</div>
      </div>
    </div>
  );
}