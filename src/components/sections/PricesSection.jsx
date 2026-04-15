import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";

export default function PricesSection({ data, compactTop = false }) {
  const items = Array.isArray(data?.items) ? data.items : [];

  return (
    <section
      id="prices"
      style={{
        padding: compactTop ? "30px 0 95px" : "60px 0 95px",
      }}
    >
      <Container wide>
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {data.kicker ? (
            <div
              style={{
                color: "var(--accentA)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: 13,
                marginBottom: 18,
              }}
            >
              {data.kicker}
            </div>
          ) : null}

          <h2
            style={{
              margin: 0,
              fontSize: "clamp(38px, 5vw, 68px)",
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              maxWidth: 760,
              marginInline: "auto",
            }}
          >
            {data.title}
          </h2>

          {data.desc ? (
            <p
              style={{
                margin: "22px auto 0",
                maxWidth: 680,
                color: "var(--muted)",
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              {data.desc}
            </p>
          ) : null}
        </div>

        <div className="prices-band-grid">
          {items.map((item, index) => (
            <PriceBand
              key={`${item.title}-${index}`}
              title={item.title}
              desc={item.desc}
              price={item.price}
              featured={index === 1}
            />
          ))}
        </div>

        <div className="prices-band-cta">
          <Button href="#booking" variant="secondary">
            Reservar cita
          </Button>
        </div>
      </Container>
    </section>
  );
}

function PriceBand({ title, desc, price, featured = false }) {
  return (
    <article className={`price-band ${featured ? "is-featured" : ""}`}>
      <div className="price-band-left">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h3 className="price-band-title">{title}</h3>

          {featured ? (
            <span className="price-band-badge">Más pedido</span>
          ) : null}
        </div>

        <p className="price-band-desc">{desc}</p>
      </div>

      <div className="price-band-right">
        <div className="price-band-price">{price}</div>
      </div>
    </article>
  );
}