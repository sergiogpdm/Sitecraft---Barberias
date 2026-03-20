import { useMemo, useState } from "react";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

import HeroSection from "../components/sections/HeroSection.jsx";
import ServicesSection from "../components/sections/ServicesSection.jsx";
import PricesSection from "../components/sections/PricesSection.jsx";
import PhotoStripSection from "../components/sections/PhotoStripSection.jsx";
import BookingSection from "../components/sections/BookingSection.jsx";
import Footer from "../components/Footer.jsx";

function toConfigFileString(config) {
  return `export const siteConfig = ${JSON.stringify(config, null, 2)};`;
}

function parseConfigText(text) {
  const trimmed = text.trim();
  if (!trimmed) throw new Error("Texto vacío");

  let objText = trimmed.replace(/^export\s+const\s+siteConfig\s*=\s*/m, "");
  objText = objText.replace(/;\s*$/m, "");

  return JSON.parse(objText);
}

const TABS = [
  { key: "general", label: "General" },
  { key: "hero", label: "Hero" },
  { key: "services", label: "Services" },
  { key: "prices", label: "Prices" },
  { key: "photoStrip", label: "PhotoStrip" },
  { key: "booking", label: "Booking" },
  { key: "footer", label: "Footer" },
];

export default function Customize() {
  const { config, setConfig } = useSiteConfig();
  const [active, setActive] = useState("general");
  const [textBox, setTextBox] = useState("");
  const [msg, setMsg] = useState("");

  const activeLabel = useMemo(
    () => TABS.find((t) => t.key === active)?.label || "Preview",
    [active]
  );

  const setMessage = (value) => {
    setMsg(value);
    setTimeout(() => setMsg(""), 2500);
  };

  const updateRoot = (section, key, value) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const updateCopy = (section, key, value) => {
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

  const updateThemeOverride = (key, value) => {
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

  const toggleSection = (id) => {
    setConfig((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        home: {
          ...prev.pages.home,
          sections: prev.pages.home.sections.map((s) =>
            s.id === id ? { ...s, enabled: !s.enabled } : s
          ),
        },
      },
    }));
  };

  const updateArrayItem = (section, index, key, value) => {
    setConfig((prev) => {
      const nextItems = [...prev.copy[section].items];
      nextItems[index] = { ...nextItems[index], [key]: value };

      return {
        ...prev,
        copy: {
          ...prev.copy,
          [section]: {
            ...prev.copy[section],
            items: nextItems,
          },
        },
      };
    });
  };

  const addArrayItem = (section, template) => {
    setConfig((prev) => ({
      ...prev,
      copy: {
        ...prev.copy,
        [section]: {
          ...prev.copy[section],
          items: [...prev.copy[section].items, template],
        },
      },
    }));
  };

  const removeArrayItem = (section, index) => {
    setConfig((prev) => ({
      ...prev,
      copy: {
        ...prev.copy,
        [section]: {
          ...prev.copy[section],
          items: prev.copy[section].items.filter((_, i) => i !== index),
        },
      },
    }));
  };

  const moveArrayItem = (section, index, direction) => {
    setConfig((prev) => {
      const arr = [...prev.copy[section].items];
      const target = index + direction;
      if (target < 0 || target >= arr.length) return prev;
      [arr[index], arr[target]] = [arr[target], arr[index]];

      return {
        ...prev,
        copy: {
          ...prev.copy,
          [section]: {
            ...prev.copy[section],
            items: arr,
          },
        },
      };
    });
  };

  const updatePhoto = (index, value) => {
    setConfig((prev) => {
      const photos = [...prev.copy.photoStrip.photos];
      photos[index] = value;

      return {
        ...prev,
        copy: {
          ...prev.copy,
          photoStrip: {
            ...prev.copy.photoStrip,
            photos,
          },
        },
      };
    });
  };

  const addPhoto = () => {
    setConfig((prev) => ({
      ...prev,
      copy: {
        ...prev.copy,
        photoStrip: {
          ...prev.copy.photoStrip,
          photos: [...prev.copy.photoStrip.photos, ""],
        },
      },
    }));
  };

  const removePhoto = (index) => {
    setConfig((prev) => ({
      ...prev,
      copy: {
        ...prev.copy,
        photoStrip: {
          ...prev.copy.photoStrip,
          photos: prev.copy.photoStrip.photos.filter((_, i) => i !== index),
        },
      },
    }));
  };

  const exportConfig = async () => {
    const str = toConfigFileString(config);
    setTextBox(str);

    try {
      await navigator.clipboard.writeText(str);
      setMessage("✅ Config copiada al portapapeles.");
    } catch {
      setMessage("⚠️ No pude copiarla. La tienes en el cuadro de texto.");
    }
  };

  const importConfig = () => {
    try {
      const parsed = parseConfigText(textBox);
      setConfig(parsed);
      setMessage("✅ Config importada.");
    } catch {
      setMessage("❌ Import fallido. Revisa el texto pegado.");
    }
  };

  return (
    <main style={{ maxWidth: 1320, margin: "0 auto", padding: 32 }}>
      <h1 style={{ marginTop: 0 }}>Customize</h1>

      {msg ? (
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            background: "var(--card)",
          }}
        >
          {msg}
        </div>
      ) : null}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            style={{
              padding: "10px 14px",
              borderRadius: "var(--btnRadius)",
              border: "1px solid var(--border)",
              background: active === tab.key ? "var(--accentA)" : "var(--card)",
              color: active === tab.key ? "#111" : "var(--text)",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {tab.label}
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
            alignSelf: "start",
          }}
        >
          {active === "general" && (
            <>
              <SectionTitle>General</SectionTitle>

              <Input
                label="Nombre negocio"
                value={config.brand.name}
                onChange={(v) => updateRoot("brand", "name", v)}
              />

              <Input
                label="Tagline"
                value={config.brand.tagline}
                onChange={(v) => updateRoot("brand", "tagline", v)}
              />

              <Input
                label="Emoji logo"
                value={config.brand.emojiLogo}
                onChange={(v) => updateRoot("brand", "emojiLogo", v)}
              />

              <Input
                label="WhatsApp URL"
                value={config.links.whatsapp}
                onChange={(v) =>
                  setConfig((prev) => ({
                    ...prev,
                    links: { ...prev.links, whatsapp: v },
                  }))
                }
              />

              <Input
                label="Instagram URL"
                value={config.links.instagram}
                onChange={(v) =>
                  setConfig((prev) => ({
                    ...prev,
                    links: { ...prev.links, instagram: v },
                  }))
                }
              />

              <Input
                label="Google Maps URL"
                value={config.links.maps}
                onChange={(v) =>
                  setConfig((prev) => ({
                    ...prev,
                    links: { ...prev.links, maps: v },
                  }))
                }
              />

              <Input
                label="Dirección"
                value={config.contact.address}
                onChange={(v) =>
                  setConfig((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, address: v },
                  }))
                }
              />

              <Input
                label="Horario"
                value={config.contact.hours}
                onChange={(v) =>
                  setConfig((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, hours: v },
                  }))
                }
              />

              <Input
                label="Color fondo"
                value={config.theme.overrides["--bg"] || ""}
                onChange={(v) => updateThemeOverride("--bg", v)}
              />

              <Input
                label="Color card"
                value={config.theme.overrides["--card"] || ""}
                onChange={(v) => updateThemeOverride("--card", v)}
              />

              <Input
                label="Color texto"
                value={config.theme.overrides["--text"] || ""}
                onChange={(v) => updateThemeOverride("--text", v)}
              />

              <Input
                label="Color acento"
                value={config.theme.overrides["--accentA"] || ""}
                onChange={(v) => updateThemeOverride("--accentA", v)}
              />

              <div style={{ marginTop: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Secciones Home</div>

                {config.pages.home.sections.map((section) => (
                  <label
                    key={section.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "10px 12px",
                      marginBottom: 10,
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                    }}
                  >
                    <span>{section.label || section.id}</span>
                    <input
                      type="checkbox"
                      checked={!!section.enabled}
                      onChange={() => toggleSection(section.id)}
                      style={{ width: 18, height: 18 }}
                    />
                  </label>
                ))}
              </div>
            </>
          )}

          {active === "hero" && (
            <>
              <SectionTitle>Hero</SectionTitle>

              <Input
                label="Badge"
                value={config.copy.hero.badge}
                onChange={(v) => updateCopy("hero", "badge", v)}
              />
              <Input
                label="Título A"
                value={config.copy.hero.titleA}
                onChange={(v) => updateCopy("hero", "titleA", v)}
              />
              <Input
                label="Título Highlight"
                value={config.copy.hero.titleHighlight}
                onChange={(v) => updateCopy("hero", "titleHighlight", v)}
              />
              <Input
                label="Título B"
                value={config.copy.hero.titleB}
                onChange={(v) => updateCopy("hero", "titleB", v)}
              />
              <Textarea
                label="Subtitle"
                value={config.copy.hero.subtitle}
                onChange={(v) => updateCopy("hero", "subtitle", v)}
              />
              <Input
                label="CTA texto"
                value={config.copy.hero.ctaText}
                onChange={(v) => updateCopy("hero", "ctaText", v)}
              />
              <Input
                label="CTA href"
                value={config.copy.hero.ctaHref}
                onChange={(v) => updateCopy("hero", "ctaHref", v)}
              />
              <Input
                label="Imagen hero"
                value={config.copy.hero.imageSrc}
                onChange={(v) => updateCopy("hero", "imageSrc", v)}
              />
            </>
          )}

          {active === "services" && (
            <>
              <SectionTitle>Services</SectionTitle>

              <Input
                label="Kicker"
                value={config.copy.services.kicker}
                onChange={(v) => updateCopy("services", "kicker", v)}
              />
              <Input
                label="Título"
                value={config.copy.services.title}
                onChange={(v) => updateCopy("services", "title", v)}
              />
              <Textarea
                label="Descripción"
                value={config.copy.services.desc}
                onChange={(v) => updateCopy("services", "desc", v)}
              />

              <div style={{ marginTop: 18 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Items</div>

                {config.copy.services.items.map((item, index) => (
                  <ArrayCard
                    key={`${item.title}-${index}`}
                    title={`Servicio ${index + 1}`}
                    onMoveUp={() => moveArrayItem("services", index, -1)}
                    onMoveDown={() => moveArrayItem("services", index, 1)}
                    onRemove={() => removeArrayItem("services", index)}
                  >
                    <Input
                      label="Título"
                      value={item.title}
                      onChange={(v) => updateArrayItem("services", index, "title", v)}
                    />
                    <Textarea
                      label="Descripción"
                      value={item.desc}
                      onChange={(v) => updateArrayItem("services", index, "desc", v)}
                    />
                  </ArrayCard>
                ))}

                <button
                  onClick={() =>
                    addArrayItem("services", {
                      title: "Nuevo servicio",
                      desc: "Descripción del servicio",
                    })
                  }
                  style={smallButtonStyle}
                >
                  + Añadir servicio
                </button>
              </div>
            </>
          )}

          {active === "prices" && (
            <>
              <SectionTitle>Prices</SectionTitle>

              <Input
                label="Kicker"
                value={config.copy.prices.kicker}
                onChange={(v) => updateCopy("prices", "kicker", v)}
              />
              <Input
                label="Título"
                value={config.copy.prices.title}
                onChange={(v) => updateCopy("prices", "title", v)}
              />
              <Textarea
                label="Descripción"
                value={config.copy.prices.desc}
                onChange={(v) => updateCopy("prices", "desc", v)}
              />

              <div style={{ marginTop: 18 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Items</div>

                {config.copy.prices.items.map((item, index) => (
                  <ArrayCard
                    key={`${item.title}-${index}`}
                    title={`Precio ${index + 1}`}
                    onMoveUp={() => moveArrayItem("prices", index, -1)}
                    onMoveDown={() => moveArrayItem("prices", index, 1)}
                    onRemove={() => removeArrayItem("prices", index)}
                  >
                    <Input
                      label="Precio"
                      value={item.price}
                      onChange={(v) => updateArrayItem("prices", index, "price", v)}
                    />
                    <Input
                      label="Título"
                      value={item.title}
                      onChange={(v) => updateArrayItem("prices", index, "title", v)}
                    />
                    <Textarea
                      label="Descripción"
                      value={item.desc}
                      onChange={(v) => updateArrayItem("prices", index, "desc", v)}
                    />
                  </ArrayCard>
                ))}

                <button
                  onClick={() =>
                    addArrayItem("prices", {
                      price: "15€",
                      title: "Nuevo servicio",
                      desc: "Descripción del precio",
                    })
                  }
                  style={smallButtonStyle}
                >
                  + Añadir precio
                </button>
              </div>
            </>
          )}

          {active === "photoStrip" && (
            <>
              <SectionTitle>PhotoStrip</SectionTitle>

              <Input
                label="Kicker"
                value={config.copy.photoStrip.kicker}
                onChange={(v) => updateCopy("photoStrip", "kicker", v)}
              />
              <Input
                label="Título"
                value={config.copy.photoStrip.title}
                onChange={(v) => updateCopy("photoStrip", "title", v)}
              />
              <Textarea
                label="Nota"
                value={config.copy.photoStrip.note}
                onChange={(v) => updateCopy("photoStrip", "note", v)}
              />

              <div style={{ marginTop: 18 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Fotos</div>

                {config.copy.photoStrip.photos.map((photo, index) => (
                  <ArrayCard
                    key={`${photo}-${index}`}
                    title={`Foto ${index + 1}`}
                    onRemove={() => removePhoto(index)}
                  >
                    <Input
                      label="URL foto"
                      value={photo}
                      onChange={(v) => updatePhoto(index, v)}
                    />
                  </ArrayCard>
                ))}

                <button onClick={addPhoto} style={smallButtonStyle}>
                  + Añadir foto
                </button>
              </div>
            </>
          )}

          {active === "booking" && (
            <>
              <SectionTitle>Booking</SectionTitle>

              <Input
                label="Kicker"
                value={config.copy.booking.kicker}
                onChange={(v) => updateCopy("booking", "kicker", v)}
              />
              <Input
                label="Título"
                value={config.copy.booking.title}
                onChange={(v) => updateCopy("booking", "title", v)}
              />
              <Textarea
                label="Descripción"
                value={config.copy.booking.desc}
                onChange={(v) => updateCopy("booking", "desc", v)}
              />
              <Input
                label="CTA texto"
                value={config.copy.booking.ctaText}
                onChange={(v) => updateCopy("booking", "ctaText", v)}
              />
              <Input
                label="CTA href"
                value={config.copy.booking.ctaHref}
                onChange={(v) => updateCopy("booking", "ctaHref", v)}
              />
            </>
          )}

          {active === "footer" && (
            <>
              <SectionTitle>Footer</SectionTitle>

              <Input
                label="Título"
                value={config.copy.footer.title}
                onChange={(v) => updateCopy("footer", "title", v)}
              />
              <Input
                label="Subtitle"
                value={config.copy.footer.subtitle}
                onChange={(v) => updateCopy("footer", "subtitle", v)}
              />
              <Input
                label="Small"
                value={config.copy.footer.small}
                onChange={(v) => updateCopy("footer", "small", v)}
              />
            </>
          )}
        </div>

        <div style={{ display: "grid", gap: 20 }}>
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: 16,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 10 }}>
              Preview — {activeLabel}
            </div>

            <div
              style={{
                background: "var(--bg)",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid var(--border)",
              }}
            >
              {active === "hero" && <HeroSection brand={config.brand} data={config.copy.hero} />}
              {active === "services" && <ServicesSection data={config.copy.services} />}
              {active === "prices" && <PricesSection data={config.copy.prices} />}
              {active === "photoStrip" && <PhotoStripSection data={config.copy.photoStrip} />}
              {active === "booking" && <BookingSection data={config.copy.booking} />}
              {active === "footer" && (
                <Footer data={config.copy.footer} contact={config.contact} />
              )}
              {active === "general" && (
                <>
                  <HeroSection brand={config.brand} data={config.copy.hero} />
                  <ServicesSection data={config.copy.services} />
                  <PricesSection data={config.copy.prices} />
                  <PhotoStripSection data={config.copy.photoStrip} />
                  <BookingSection data={config.copy.booking} />
                  <Footer data={config.copy.footer} contact={config.contact} />
                </>
              )}
            </div>
          </div>

          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: 16,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 10 }}>Export / Import</div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
              <button onClick={exportConfig} style={smallButtonStyle}>
                Exportar config
              </button>
              <button onClick={importConfig} style={smallButtonStyle}>
                Importar config
              </button>
              <button onClick={() => setTextBox("")} style={smallButtonStyle}>
                Limpiar
              </button>
            </div>

            <textarea
              value={textBox}
              onChange={(e) => setTextBox(e.target.value)}
              placeholder="Aquí aparecerá el export o puedes pegar un site.config.js para importarlo"
              style={{
                width: "100%",
                minHeight: 340,
                background: "#111",
                color: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: 16,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 13,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function SectionTitle({ children }) {
  return <h2 style={{ marginTop: 0 }}>{children}</h2>;
}

function Input({ label, value, onChange }) {
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      <div>{label}</div>
      <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      <div>{label}</div>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ minHeight: 100 }}
      />
    </label>
  );
}

function ArrayCard({
  title,
  children,
  onMoveUp,
  onMoveDown,
  onRemove,
}) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg)",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <strong>{title}</strong>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {onMoveUp && (
            <button onClick={onMoveUp} style={tinyButtonStyle}>
              ↑
            </button>
          )}
          {onMoveDown && (
            <button onClick={onMoveDown} style={tinyButtonStyle}>
              ↓
            </button>
          )}
          {onRemove && (
            <button onClick={onRemove} style={tinyButtonStyle}>
              Borrar
            </button>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

const smallButtonStyle = {
  padding: "10px 14px",
  borderRadius: "var(--btnRadius)",
  border: "1px solid var(--border)",
  background: "var(--accentA)",
  color: "#111",
  fontWeight: 700,
  cursor: "pointer",
};

const tinyButtonStyle = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--text)",
  cursor: "pointer",
};