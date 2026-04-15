import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";

export default function BookingSection({ data }) {
  return (
    <section
      id="booking"
      style={{
        padding: "120px 0",
        position: "relative",
      }}
    >
      <Container>
        <div className="booking-wrapper">
          {data.kicker && (
            <div className="booking-kicker">{data.kicker}</div>
          )}

          <h2 className="booking-title">{data.title}</h2>

          {data.desc && (
            <p className="booking-desc">{data.desc}</p>
          )}

          <div className="booking-actions">
            <Button href={data.ctaHref} target="_blank">
              {data.ctaText}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}