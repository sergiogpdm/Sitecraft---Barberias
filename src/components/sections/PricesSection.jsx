import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";

export default function PricesSection({ data }) {
  const items = Array.isArray(data?.items) ? data.items : [];

  return (
    <section
      id="prices"
      style={{
        padding: "60px 0 85px",
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

        <div className="prices-showcase-grid">
          {items.map((item, index) => (
            <PriceShowcaseCard
              key={`${item.title}-${index}`}
              title={item.title}
              desc={item.desc}
              price={item.price}
              image={item.image}
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

function PriceShowcaseCard({ title, desc, price, image, featured = false }) {
  return (
    <article className={`price-showcase-card ${featured ? "is-featured" : ""}`}>
      <div className="price-showcase-media">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="price-showcase-placeholder" />
        )}

        <div className="price-showcase-overlay" />

        <div className="price-showcase-topbar">
          {featured ? (
            <span className="price-showcase-badge">Más pedido</span>
          ) : null}
        </div>
      </div>

      <div className="price-showcase-body">
        <div className="price-showcase-head">
          <h3 className="price-showcase-title">{title}</h3>
          <div className="price-showcase-price">{price}</div>
        </div>

        <p className="price-showcase-desc">{desc}</p>

        <div className="price-showcase-line" />
      </div>
    </article>
  );
}