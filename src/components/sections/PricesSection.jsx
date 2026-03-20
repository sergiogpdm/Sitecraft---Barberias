import Container from "../Container.jsx";
import GlassCard from "../GlassCard.jsx";

export default function PricesSection({ data }) {
  return (
    <section style={{ padding: "30px 0" }}>
      <Container>
        <div style={{ color: "var(--accentA)", marginBottom: 8 }}>{data.kicker}</div>
        <h2 style={{ margin: 0, fontSize: 34 }}>{data.title}</h2>
        <p style={{ color: "var(--muted)", marginTop: 10 }}>{data.desc}</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginTop: 24,
          }}
        >
          {data.items.map((item) => (
            <GlassCard key={item.title} style={{ padding: 22 }}>
              <div
                style={{
                  color: "var(--accentA)",
                  fontWeight: 700,
                  fontSize: 24,
                  marginBottom: 10,
                }}
              >
                {item.price}
              </div>
              <h3 style={{ marginTop: 0 }}>{item.title}</h3>
              <p style={{ color: "var(--muted)", marginBottom: 0 }}>{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}