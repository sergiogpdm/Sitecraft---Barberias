import Container from "../Container.jsx";

export default function PhotoStripSection({ data }) {
  return (
    <section style={{ padding: "30px 0" }}>
      <Container>
        <div style={{ color: "var(--accentA)", marginBottom: 8 }}>{data.kicker}</div>
        <h2 style={{ margin: 0, fontSize: 34 }}>{data.title}</h2>
        <p style={{ color: "var(--muted)", marginTop: 10 }}>{data.note}</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginTop: 24,
          }}
        >
          {data.photos.map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`Trabajo ${i + 1}`}
              style={{
                width: "100%",
                height: 280,
                objectFit: "cover",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}