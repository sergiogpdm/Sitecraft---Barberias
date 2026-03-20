import Container from "../Container.jsx";
import GlassCard from "../GlassCard.jsx";
import Button from "../ui/Button.jsx";

export default function BookingSection({ data }) {
  return (
    <section style={{ padding: "30px 0 60px" }}>
      <Container>
        <GlassCard style={{ padding: 28 }}>
          <div style={{ color: "var(--accentA)", marginBottom: 8 }}>{data.kicker}</div>
          <h2 style={{ margin: 0, fontSize: 34 }}>{data.title}</h2>
          <p style={{ color: "var(--muted)", marginTop: 10 }}>{data.desc}</p>

          <div style={{ marginTop: 18 }}>
            <Button href={data.ctaHref} target="_blank" rel="noreferrer">
              {data.ctaText}
            </Button>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}