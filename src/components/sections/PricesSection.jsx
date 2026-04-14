import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";

export default function PricesSection({ data }) {
  const items = Array.isArray(data?.items) ? data.items : [];

  return (
    <section
      id="prices"
      style={{
        padding: "110px 0 95px",
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

        <div
          style={{
            marginTop: 62,
            maxWidth: 980,
            marginInline: "auto",
            borderTop: "1px solid var(--border)",
          }}
        >
          {items.map((item, index) => (
            <PriceRow
              key={`${item.title}-${index}`}
              title={item.title}
              desc={item.desc}
              price={item.price}
              featured={index === 1}
            />
          ))}
        </div>

        <div
          style={{
            marginTop: 34,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <Button href="#booking" variant="secondary">
            Reservar cita
          </Button>
        </div>
      </Container>
    </section>
  );
}

function PriceRow({ title, desc, price, featured = false }) {
  return (
    <div
      className="price-row-editorial"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 24,
        alignItems: "center",
        padding: "30px 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(24px, 2vw, 34px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </h3>

          {featured ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "6px 10px",
                borderRadius: 999,
                background: "rgba(212,175,55,0.10)",
                border: "1px solid rgba(212,175,55,0.20)",
                color: "var(--accentA)",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Más pedido
            </span>
          ) : null}
        </div>

        {desc ? (
          <p
            style={{
              marginTop: 12,
              marginBottom: 0,
              maxWidth: 560,
              color: "var(--muted)",
              fontSize: 15.5,
              lineHeight: 1.8,
            }}
          >
            {desc}
          </p>
        ) : null}
      </div>

      <div
        style={{
          minWidth: 120,
          textAlign: "right",
          alignSelf: "start",
        }}
      >
        <div
          style={{
            fontSize: "clamp(28px, 3vw, 42px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            fontWeight: 800,
            color: featured ? "var(--accentA)" : "var(--text)",
          }}
        >
          {price}
        </div>

        <div
          style={{
            marginTop: 8,
            width: 56,
            height: 1,
            background: featured ? "var(--accentA)" : "var(--border)",
            marginLeft: "auto",
          }}
        />
      </div>
    </div>
  );
}