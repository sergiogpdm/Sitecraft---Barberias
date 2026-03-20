import { useSiteConfig } from "../context/SiteConfigContext.jsx";

export default function Home() {
  const { config } = useSiteConfig();
  const { brand, copy, contact, links } = config;

  return (
    <main style={{ minHeight: "100vh", padding: "40px 20px", maxWidth: 1200, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
        <div>
          <strong>{brand.emojiLogo} {brand.name}</strong>
          <div style={{ color: "var(--muted)", marginTop: 6 }}>{brand.tagline}</div>
        </div>

        <a
          href={links.whatsapp}
          target="_blank"
          rel="noreferrer"
          style={{
            background: "var(--accentA)",
            color: "#111",
            padding: "12px 18px",
            borderRadius: "var(--btnRadius)",
            fontWeight: 700
          }}
        >
          Reservar
        </a>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 32, alignItems: "center", marginBottom: 60 }}>
        <div>
          <div style={{ color: "var(--accentA)", marginBottom: 12 }}>{copy.hero.badge}</div>
          <h1 style={{ fontFamily: "var(--fontDisplay)", fontSize: 56, lineHeight: 1.05, margin: 0 }}>
            {copy.hero.titleA} <span style={{ color: "var(--accentA)" }}>{copy.hero.titleHighlight}</span>
            <br />
            {copy.hero.titleB}
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 18, marginTop: 18, maxWidth: 620 }}>
            {copy.hero.subtitle}
          </p>
          <a
            href={copy.hero.ctaHref}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: 20,
              background: "var(--accentA)",
              color: "#111",
              padding: "14px 22px",
              borderRadius: "var(--btnRadius)",
              fontWeight: 700
            }}
          >
            {copy.hero.ctaText}
          </a>
        </div>

        <img
          src={copy.hero.imageSrc}
          alt={brand.name}
          style={{ width: "100%", borderRadius: "var(--radius)", objectFit: "cover", minHeight: 420 }}
        />
      </section>

      <section style={{ marginBottom: 50 }}>
        <h2>{copy.services.title}</h2>
        <p style={{ color: "var(--muted)" }}>{copy.services.desc}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 20 }}>
          {copy.services.items.map((item) => (
            <div
              key={item.title}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: 20
              }}
            >
              <h3>{item.title}</h3>
              <p style={{ color: "var(--muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 50 }}>
        <h2>{copy.prices.title}</h2>
        <p style={{ color: "var(--muted)" }}>{copy.prices.desc}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 20 }}>
          {copy.prices.items.map((item) => (
            <div
              key={item.title}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: 20
              }}
            >
              <div style={{ color: "var(--accentA)", fontWeight: 700, marginBottom: 8 }}>{item.price}</div>
              <h3>{item.title}</h3>
              <p style={{ color: "var(--muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 50 }}>
        <h2>{copy.photoStrip.title}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 20 }}>
          {copy.photoStrip.photos.map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`Trabajo ${i + 1}`}
              style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: "var(--radius)" }}
            />
          ))}
        </div>
      </section>

      <section
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: 28,
          marginBottom: 50
        }}
      >
        <h2>{copy.booking.title}</h2>
        <p style={{ color: "var(--muted)" }}>{copy.booking.desc}</p>
        <a
          href={copy.booking.ctaHref}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            marginTop: 18,
            background: "var(--accentA)",
            color: "#111",
            padding: "14px 22px",
            borderRadius: "var(--btnRadius)",
            fontWeight: 700
          }}
        >
          {copy.booking.ctaText}
        </a>
      </section>

      <footer style={{ borderTop: "1px solid var(--border)", paddingTop: 24, color: "var(--muted)" }}>
        <div>{copy.footer.title}</div>
        <div>{copy.footer.subtitle}</div>
        <div style={{ marginTop: 10 }}>{contact.address} · {contact.hours}</div>
      </footer>
    </main>
  );
}