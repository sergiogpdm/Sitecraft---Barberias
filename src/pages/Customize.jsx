import { useState } from "react";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

function toConfigFileString(config) {
  return `export const siteConfig = ${JSON.stringify(config, null, 2)};`;
}

const tabs = ["general", "hero", "services", "prices", "photoStrip", "booking", "footer"];

export default function Customize() {
  const { config, setConfig } = useSiteConfig();
  const [active, setActive] = useState("general");
  const [exportText, setExportText] = useState("");

  const updateSection = (section, key, value) => {
    setConfig((prev) => ({
      ...prev,
      copy: {
        ...prev.copy,
        [section]: {
          ...prev.copy[section],
          [key]: value,
        },
      },
    }));
  };

  const updateTheme = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        overrides: {
          ...prev.theme.overrides,
          [key]: value,
        },
      },
    }));
  };

  const exportConfig = () => {
    setExportText(toConfigFileString(config));
  };

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: 40 }}>
      <h1 style={{ marginTop: 0 }}>Customize</h1>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              padding: "10px 14px",
              borderRadius: "var(--btnRadius)",
              border: "1px solid var(--border)",
              background: active === tab ? "var(--accentA)" : "var(--card)",
              color: active === tab ? "#111" : "var(--text)",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 24 }}>
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: 20,
          }}
        >
          {active === "general" && (
            <>
              <h2 style={{ marginTop: 0 }}>General</h2>

              <label style={{ display: "block", marginBottom: 12 }}>
                <div>Nombre negocio</div>
                <input
                  value={config.brand.name}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      brand: { ...prev.brand, name: e.target.value },
                    }))
                  }
                  style={{ width: "100%", marginTop: 6 }}
                />
              </label>

              <label style={{ display: "block", marginBottom: 12 }}>
                <div>Tagline</div>
                <input
                  value={config.brand.tagline}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      brand: { ...prev.brand, tagline: e.target.value },
                    }))
                  }
                  style={{ width: "100%", marginTop: 6 }}
                />
              </label>

              <label style={{ display: "block", marginBottom: 12 }}>
                <div>WhatsApp URL</div>
                <input
                  value={config.links.whatsapp}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      links: { ...prev.links, whatsapp: e.target.value },
                    }))
                  }
                  style={{ width: "100%", marginTop: 6 }}
                />
              </label>

              <label style={{ display: "block", marginBottom: 12 }}>
                <div>Color fondo</div>
                <input
                  value={config.theme.overrides["--bg"] || ""}
                  onChange={(e) => updateTheme("--bg", e.target.value)}
                  style={{ width: "100%", marginTop: 6 }}
                />
              </label>

              <label style={{ display: "block", marginBottom: 12 }}>
                <div>Color acento</div>
                <input
                  value={config.theme.overrides["--accentA"] || ""}
                  onChange={(e) => updateTheme("--accentA", e.target.value)}
                  style={{ width: "100%", marginTop: 6 }}
                />
              </label>
            </>
          )}

          {active === "hero" && (
            <>
              <h2 style={{ marginTop: 0 }}>Hero</h2>
              {["badge", "titleA", "titleHighlight", "titleB", "ctaText", "ctaHref", "imageSrc"].map((field) => (
                <label key={field} style={{ display: "block", marginBottom: 12 }}>
                  <div>{field}</div>
                  <input
                    value={config.copy.hero[field]}
                    onChange={(e) => updateSection("hero", field, e.target.value)}
                    style={{ width: "100%", marginTop: 6 }}
                  />
                </label>
              ))}

              <label style={{ display: "block", marginBottom: 12 }}>
                <div>subtitle</div>
                <textarea
                  value={config.copy.hero.subtitle}
                  onChange={(e) => updateSection("hero", "subtitle", e.target.value)}
                  style={{ width: "100%", marginTop: 6, minHeight: 100 }}
                />
              </label>
            </>
          )}

          {active === "services" && (
            <>
              <h2 style={{ marginTop: 0 }}>Services</h2>
              <label style={{ display: "block", marginBottom: 12 }}>
                <div>title</div>
                <input
                  value={config.copy.services.title}
                  onChange={(e) => updateSection("services", "title", e.target.value)}
                  style={{ width: "100%", marginTop: 6 }}
                />
              </label>
              <label style={{ display: "block", marginBottom: 12 }}>
                <div>desc</div>
                <textarea
                  value={config.copy.services.desc}
                  onChange={(e) => updateSection("services", "desc", e.target.value)}
                  style={{ width: "100%", marginTop: 6, minHeight: 100 }}
                />
              </label>
            </>
          )}

          {active === "prices" && (
            <>
              <h2 style={{ marginTop: 0 }}>Prices</h2>
              <label style={{ display: "block", marginBottom: 12 }}>
                <div>title</div>
                <input
                  value={config.copy.prices.title}
                  onChange={(e) => updateSection("prices", "title", e.target.value)}
                  style={{ width: "100%", marginTop: 6 }}
                />
              </label>
              <label style={{ display: "block", marginBottom: 12 }}>
                <div>desc</div>
                <textarea
                  value={config.copy.prices.desc}
                  onChange={(e) => updateSection("prices", "desc", e.target.value)}
                  style={{ width: "100%", marginTop: 6, minHeight: 100 }}
                />
              </label>
            </>
          )}

          {active === "photoStrip" && (
            <>
              <h2 style={{ marginTop: 0 }}>PhotoStrip</h2>
              <label style={{ display: "block", marginBottom: 12 }}>
                <div>title</div>
                <input
                  value={config.copy.photoStrip.title}
                  onChange={(e) => updateSection("photoStrip", "title", e.target.value)}
                  style={{ width: "100%", marginTop: 6 }}
                />
              </label>
              <label style={{ display: "block", marginBottom: 12 }}>
                <div>note</div>
                <textarea
                  value={config.copy.photoStrip.note}
                  onChange={(e) => updateSection("photoStrip", "note", e.target.value)}
                  style={{ width: "100%", marginTop: 6, minHeight: 100 }}
                />
              </label>
            </>
          )}

          {active === "booking" && (
            <>
              <h2 style={{ marginTop: 0 }}>Booking</h2>
              {["title", "ctaText", "ctaHref"].map((field) => (
                <label key={field} style={{ display: "block", marginBottom: 12 }}>
                  <div>{field}</div>
                  <input
                    value={config.copy.booking[field]}
                    onChange={(e) => updateSection("booking", field, e.target.value)}
                    style={{ width: "100%", marginTop: 6 }}
                  />
                </label>
              ))}
              <label style={{ display: "block", marginBottom: 12 }}>
                <div>desc</div>
                <textarea
                  value={config.copy.booking.desc}
                  onChange={(e) => updateSection("booking", "desc", e.target.value)}
                  style={{ width: "100%", marginTop: 6, minHeight: 100 }}
                />
              </label>
            </>
          )}

          {active === "footer" && (
            <>
              <h2 style={{ marginTop: 0 }}>Footer</h2>
              {["title", "subtitle", "small"].map((field) => (
                <label key={field} style={{ display: "block", marginBottom: 12 }}>
                  <div>{field}</div>
                  <input
                    value={config.copy.footer[field]}
                    onChange={(e) => updateSection("footer", field, e.target.value)}
                    style={{ width: "100%", marginTop: 6 }}
                  />
                </label>
              ))}
            </>
          )}

          <button onClick={exportConfig}>Exportar config</button>
        </div>

        <textarea
          value={exportText}
          readOnly
          style={{
            width: "100%",
            minHeight: 700,
            background: "#111",
            color: "#fff",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: 16,
          }}
        />
      </div>
    </main>
  );
}