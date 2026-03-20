import { useState } from "react";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

function toConfigFileString(config) {
  return `export const siteConfig = ${JSON.stringify(config, null, 2)};`;
}

export default function Customize() {
  const { config, setConfig } = useSiteConfig();
  const [exportText, setExportText] = useState("");

  const setHeroField = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      copy: {
        ...prev.copy,
        hero: {
          ...prev.copy.hero,
          [key]: value
        }
      }
    }));
  };

  const exportConfig = () => {
    setExportText(toConfigFileString(config));
  };

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 40 }}>
      <h1>Customize</h1>

      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 24, marginTop: 24 }}>
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: 20
          }}
        >
          <h2 style={{ marginTop: 0 }}>Hero</h2>

          <label style={{ display: "block", marginBottom: 12 }}>
            <div>Badge</div>
            <input
              value={config.copy.hero.badge}
              onChange={(e) => setHeroField("badge", e.target.value)}
              style={{ width: "100%", marginTop: 6 }}
            />
          </label>

          <label style={{ display: "block", marginBottom: 12 }}>
            <div>Título A</div>
            <input
              value={config.copy.hero.titleA}
              onChange={(e) => setHeroField("titleA", e.target.value)}
              style={{ width: "100%", marginTop: 6 }}
            />
          </label>

          <label style={{ display: "block", marginBottom: 12 }}>
            <div>Título Highlight</div>
            <input
              value={config.copy.hero.titleHighlight}
              onChange={(e) => setHeroField("titleHighlight", e.target.value)}
              style={{ width: "100%", marginTop: 6 }}
            />
          </label>

          <label style={{ display: "block", marginBottom: 12 }}>
            <div>Título B</div>
            <input
              value={config.copy.hero.titleB}
              onChange={(e) => setHeroField("titleB", e.target.value)}
              style={{ width: "100%", marginTop: 6 }}
            />
          </label>

          <label style={{ display: "block", marginBottom: 12 }}>
            <div>Subtitle</div>
            <textarea
              value={config.copy.hero.subtitle}
              onChange={(e) => setHeroField("subtitle", e.target.value)}
              style={{ width: "100%", marginTop: 6, minHeight: 100 }}
            />
          </label>

          <button onClick={exportConfig}>Exportar config</button>
        </div>

        <div>
          <textarea
            value={exportText}
            readOnly
            style={{
              width: "100%",
              minHeight: 600,
              background: "#111",
              color: "#fff",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: 16
            }}
          />
        </div>
      </div>
    </main>
  );
}