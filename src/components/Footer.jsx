import Container from "./Container.jsx";

export default function Footer({ data, contact }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 0 40px" }}>
      <Container>
        <div style={{ fontWeight: 700 }}>{data.title}</div>
        <div style={{ color: "var(--muted)", marginTop: 6 }}>{data.subtitle}</div>
        <div style={{ color: "var(--muted)", marginTop: 10 }}>
          {contact.address} · {contact.hours}
        </div>
        <div style={{ color: "var(--muted)", marginTop: 10 }}>{data.small}</div>
      </Container>
    </footer>
  );
}