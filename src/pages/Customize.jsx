import { useMemo, useState } from "react";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import { presets } from "../config/presets.js";

import HeroSection from "../components/sections/HeroSection.jsx";
import ServicesSection from "../components/sections/ServicesSection.jsx";
import TestimonialsSection from "../components/sections/TestimonialsSection.jsx";
import PricesSection from "../components/sections/PricesSection.jsx";
import PhotoStripSection from "../components/sections/PhotoStripSection.jsx";
import BookingSection from "../components/sections/BookingSection.jsx";
import Footer from "../components/Footer.jsx";

import { clientConfigs } from "../config/clientes/index.js";

function toConfigFileString(config) {
  return `export const siteConfig = ${JSON.stringify(config, null, 2)};\n`;
}

function parseConfigText(text) {
  const trimmed = text.trim();
  if (!trimmed) throw new Error("Texto vacío");

  let objText = trimmed.replace(/^export\s+const\s+siteConfig\s*=\s*/m, "");
  objText = objText.replace(/;\s*$/m, "");

  return JSON.parse(objText);
}

function ensureHomeSections(existingSections = []) {
  const defaults = [
    { id: "hero", enabled: true, label: "Inicio" },
    { id: "services", enabled: true, label: "Servicios" },
    { id: "testimonials", enabled: true, label: "Opiniones" },
    { id: "photoStrip", enabled: true, label: "Galería" },
    { id: "prices", enabled: true, label: "Precios" },
    { id: "booking", enabled: true, label: "Reservar" },
  ];

  const byId = new Map((existingSections || []).map((s) => [s.id, s]));

  return defaults.map((base) => ({
    ...base,
    ...(byId.get(base.id) || {}),
  }));
}

function ensureConfigShape(config) {
  return {
    ...config,

    brand: {
      name: "",
      tagline: "",
      emojiLogo: "💈",
      logoImage: "",
      ...(config?.brand || {}),
    },

    links: {
      whatsapp: "",
      instagram: "",
      maps: "",
      ...(config?.links || {}),
    },

    contact: {
      phoneDisplay: "",
      phoneTel: "",
      email: "",
      address: "",
      hours: "",
      phone: "",
      ...(config?.contact || {}),
    },

    layout: {
      showNavbarCta: true,
      showFloatingWhatsApp: true,
      showFloatingBooking: true,
      ...(config?.layout || {}),
    },

    bookingPlatform: {
      type: "none", // yeasy | booksy | custom | none
      label: "Reservar",
      url: "",
      ...(config?.bookingPlatform || {}),
    },

    theme: {
      preset: "goldNight",
      mode: "flat",
      scheme: "dark",
      ...(config?.theme || {}),
      overrides: {
        "--bg": "#0B0B0D",
        "--card": "#141418",
        "--text": "#F5F5F5",
        "--muted": "#A1A1AA",
        "--border": "#26262B",
        "--accentA": "#D4AF37",
        "--accentB": "#9C7A2B",
        "--accentSoft": "#1A1710",
        "--radius": "16px",
        "--btnRadius": "12px",
        "--shadowY": "18px",
        "--shadowBlur": "44px",
        "--shadowOpacity": "0.24",
        "--fontDisplay": "Playfair Display, serif",
        "--fontBody": "Inter, sans-serif",
        ...(config?.theme?.overrides || {}),
      },
    },

    pages: {
      ...(config?.pages || {}),
      home: {
        ...(config?.pages?.home || {}),
        sections: ensureHomeSections(config?.pages?.home?.sections || []),
      },
      customize: {
        enabled: true,
        ...(config?.pages?.customize || {}),
      },
    },

    copy: {
      ...(config?.copy || {}),

      hero: {
        badge: "",
        titleA: "",
        titleHighlight: "",
        titleB: "",
        subtitle: "",
        ctaText: "",
        ctaHref: "",
        imageSrc: "",
        ...(config?.copy?.hero || {}),
      },

      services: {
        kicker: "",
        title: "",
        desc: "",
        items: [],
        ...(config?.copy?.services || {}),
      },

      testimonials: {
        kicker: "Opiniones",
        title: "Clientes que vuelven por algo.",
        desc: "Confianza, detalle y resultados que se notan desde la primera visita.",
        items: [
          {
            name: "Carlos M.",
            service: "Corte + barba",
            text: "Muy buen trato y un resultado impecable.",
          },
          {
            name: "Adrián R.",
            service: "Fade",
            text: "Reserva rápida por WhatsApp y corte muy limpio.",
          },
          {
            name: "Javi P.",
            service: "Arreglo de barba",
            text: "Buen ambiente y servicio muy cuidado.",
          },
        ],
        ...(config?.copy?.testimonials || {}),
      },

      prices: {
        kicker: "",
        title: "",
        desc: "",
        items: (config?.copy?.prices?.items || []).map((item) => ({
          price: "",
          title: "",
          desc: "",
          image: "",
          ...item,
        })),
        ...(config?.copy?.prices || {}),
      },

      photoStrip: {
        kicker: "",
        title: "",
        note: "",
        photos: [],
        ...(config?.copy?.photoStrip || {}),
      },

      booking: {
        kicker: "",
        title: "",
        desc: "",
        ctaText: "",
        ctaHref: "",
        sideImages: ["", ""],
        ...(config?.copy?.booking || {}),
      },

      footer: {
        title: "",
        subtitle: "",
        small: "",
        ...(config?.copy?.footer || {}),
      },
    },
  };
}

const TABS = [
  { key: "general", label: "General" },
  { key: "hero", label: "Hero" },
  { key: "services", label: "Services" },
  { key: "testimonials", label: "Testimonials" },
  { key: "prices", label: "Prices" },
  { key: "photoStrip", label: "PhotoStrip" },
  { key: "booking", label: "Booking" },
  { key: "footer", label: "Footer" },
];

export default function Customize() {
  const { config, setConfig } = useSiteConfig();
  const safeConfig = useMemo(() => ensureConfigShape(config || {}), [config]);

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

  const applyPreset = (presetId) => {
    const found = presets.find((p) => p.id === presetId);
    if (!found) return;

    setConfig((prev) =>
      ensureConfigShape({
        ...prev,
        theme: {
          ...(prev?.theme || {}),
          preset: found.id,
          overrides: { ...found.overrides },
        },
      })
    );

    setMessage(`✅ Preset aplicado: ${found.label}`);
  };

  const updateRoot = (section, key, value) => {
    setConfig((prev) =>
      ensureConfigShape({
        ...prev,
        [section]: {
          ...(prev?.[section] || {}),
          [key]: value,
        },
      })
    );
  };

  const updateCopy = (section, key, value) => {
    setConfig((prev) =>
      ensureConfigShape({
        ...prev,
        copy: {
          ...(prev?.copy || {}),
          [section]: {
            ...(prev?.copy?.[section] || {}),
            [key]: value,
          },
        },
      })
    );
  };

  const updateThemeOverride = (key, value) => {
    setConfig((prev) =>
      ensureConfigShape({
        ...prev,
        theme: {
          ...(prev?.theme || {}),
          overrides: {
            ...(prev?.theme?.overrides || {}),
            [key]: value,
          },
        },
      })
    );
  };

  const toggleSection = (id) => {
    setConfig((prev) =>
      ensureConfigShape({
        ...prev,
        pages: {
          ...(prev?.pages || {}),
          home: {
            ...(prev?.pages?.home || {}),
            sections: (prev?.pages?.home?.sections || []).map((s) =>
              s.id === id ? { ...s, enabled: !s.enabled } : s
            ),
          },
        },
      })
    );
  };

  const updateArrayItem = (section, index, key, value) => {
    setConfig((prev) => {
      const nextItems = [...(prev?.copy?.[section]?.items || [])];
      nextItems[index] = { ...nextItems[index], [key]: value };

      return ensureConfigShape({
        ...prev,
        copy: {
          ...(prev?.copy || {}),
          [section]: {
            ...(prev?.copy?.[section] || {}),
            items: nextItems,
          },
        },
      });
    });
  };

  const addArrayItem = (section, template) => {
    setConfig((prev) =>
      ensureConfigShape({
        ...prev,
        copy: {
          ...(prev?.copy || {}),
          [section]: {
            ...(prev?.copy?.[section] || {}),
            items: [...(prev?.copy?.[section]?.items || []), template],
          },
        },
      })
    );
  };

  const removeArrayItem = (section, index) => {
    setConfig((prev) =>
      ensureConfigShape({
        ...prev,
        copy: {
          ...(prev?.copy || {}),
          [section]: {
            ...(prev?.copy?.[section] || {}),
            items: (prev?.copy?.[section]?.items || []).filter((_, i) => i !== index),
          },
        },
      })
    );
  };

  const moveArrayItem = (section, index, direction) => {
    setConfig((prev) => {
      const arr = [...(prev?.copy?.[section]?.items || [])];
      const target = index + direction;
      if (target < 0 || target >= arr.length) return ensureConfigShape(prev);
      [arr[index], arr[target]] = [arr[target], arr[index]];

      return ensureConfigShape({
        ...prev,
        copy: {
          ...(prev?.copy || {}),
          [section]: {
            ...(prev?.copy?.[section] || {}),
            items: arr,
          },
        },
      });
    });
  };

  const updatePhoto = (index, value) => {
    setConfig((prev) => {
      const photos = [...(prev?.copy?.photoStrip?.photos || [])];
      photos[index] = value;

      return ensureConfigShape({
        ...prev,
        copy: {
          ...(prev?.copy || {}),
          photoStrip: {
            ...(prev?.copy?.photoStrip || {}),
            photos,
          },
        },
      });
    });
  };

  const addPhoto = () => {
    setConfig((prev) =>
      ensureConfigShape({
        ...prev,
        copy: {
          ...(prev?.copy || {}),
          photoStrip: {
            ...(prev?.copy?.photoStrip || {}),
            photos: [...(prev?.copy?.photoStrip?.photos || []), ""],
          },
        },
      })
    );
  };

  const removePhoto = (index) => {
    setConfig((prev) =>
      ensureConfigShape({
        ...prev,
        copy: {
          ...(prev?.copy || {}),
          photoStrip: {
            ...(prev?.copy?.photoStrip || {}),
            photos: (prev?.copy?.photoStrip?.photos || []).filter((_, i) => i !== index),
          },
        },
      })
    );
  };

  const exportConfig = async () => {
    const str = toConfigFileString(safeConfig);
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
      setConfig(ensureConfigShape(parsed));
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

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>📂 Cargar cliente</div>
                <ClientLoader setConfig={setConfig} />
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>
                  🚀 Generador rápido con variantes
                </div>
                <QuickGenerator setConfig={setConfig} />
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Presets</div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset.id)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "var(--btnRadius)",
                        border: "1px solid var(--border)",
                        background:
                          safeConfig.theme.preset === preset.id
                            ? "var(--accentA)"
                            : "var(--bg)",
                        color:
                          safeConfig.theme.preset === preset.id ? "#111" : "var(--text)",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Nombre negocio"
                value={safeConfig.brand.name}
                onChange={(v) => updateRoot("brand", "name", v)}
              />

              <Input
                label="Tagline"
                value={safeConfig.brand.tagline}
                onChange={(v) => updateRoot("brand", "tagline", v)}
              />

              <Input
                label="Emoji logo"
                value={safeConfig.brand.emojiLogo}
                onChange={(v) => updateRoot("brand", "emojiLogo", v)}
              />

              <Input
                label="WhatsApp URL"
                value={safeConfig.links.whatsapp}
                onChange={(v) =>
                  setConfig((prev) =>
                    ensureConfigShape({
                      ...prev,
                      links: { ...(prev?.links || {}), whatsapp: v },
                    })
                  )
                }
              />

              <Input
                label="Instagram URL"
                value={safeConfig.links.instagram}
                onChange={(v) =>
                  setConfig((prev) =>
                    ensureConfigShape({
                      ...prev,
                      links: { ...(prev?.links || {}), instagram: v },
                    })
                  )
                }
              />

              <Input
                label="Google Maps URL"
                value={safeConfig.links.maps}
                onChange={(v) =>
                  setConfig((prev) =>
                    ensureConfigShape({
                      ...prev,
                      links: { ...(prev?.links || {}), maps: v },
                    })
                  )
                }
              />

              <Input
                label="Dirección"
                value={safeConfig.contact.address}
                onChange={(v) =>
                  setConfig((prev) =>
                    ensureConfigShape({
                      ...prev,
                      contact: { ...(prev?.contact || {}), address: v },
                    })
                  )
                }
              />

              <Input
                label="Horario"
                value={safeConfig.contact.hours}
                onChange={(v) =>
                  setConfig((prev) =>
                    ensureConfigShape({
                      ...prev,
                      contact: { ...(prev?.contact || {}), hours: v },
                    })
                  )
                }
              />

              <label style={{ display: "block", marginBottom: 12 }}>
                <div>Plataforma externa de reserva</div>
                <select
                  value={safeConfig.bookingPlatform?.type || "none"}
                  onChange={(e) =>
                    setConfig((prev) =>
                      ensureConfigShape({
                        ...prev,
                        bookingPlatform: {
                          ...(prev?.bookingPlatform || {}),
                          type: e.target.value,
                        },
                      })
                    )
                  }
                >
                  <option value="none">Ninguna</option>
                  <option value="yeasy">Yeasy</option>
                  <option value="booksy">Booksy</option>
                  <option value="custom">Custom</option>
                </select>
              </label>

              <Input
                label="Texto botón custom"
                value={safeConfig.bookingPlatform?.label || "Reservar"}
                onChange={(v) =>
                  setConfig((prev) =>
                    ensureConfigShape({
                      ...prev,
                      bookingPlatform: {
                        ...(prev?.bookingPlatform || {}),
                        label: v,
                      },
                    })
                  )
                }
              />

              <Input
                label="URL plataforma externa"
                value={safeConfig.bookingPlatform?.url || ""}
                onChange={(v) =>
                  setConfig((prev) =>
                    ensureConfigShape({
                      ...prev,
                      bookingPlatform: {
                        ...(prev?.bookingPlatform || {}),
                        url: v,
                      },
                    })
                  )
                }
              />

              <label
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
                <span>Mostrar botón flotante de reserva</span>
                <input
                  type="checkbox"
                  checked={!!safeConfig.layout.showFloatingBooking}
                  onChange={() =>
                    setConfig((prev) =>
                      ensureConfigShape({
                        ...prev,
                        layout: {
                          ...(prev?.layout || {}),
                          showFloatingBooking: !prev?.layout?.showFloatingBooking,
                        },
                      })
                    )
                  }
                  style={{ width: 18, height: 18 }}
                />
              </label>

              <ColorInput
                label="Color fondo"
                value={safeConfig.theme.overrides["--bg"] || "#0B0B0D"}
                onChange={(v) => updateThemeOverride("--bg", v)}
              />

              <ColorInput
                label="Color superficie"
                value={safeConfig.theme.overrides["--surface"] || "#1a1a1f"}
                onChange={(v) => updateThemeOverride("--surface", v)}
              />

              <ColorInput
                label="Color card"
                value={safeConfig.theme.overrides["--card"] || "#141418"}
                onChange={(v) => updateThemeOverride("--card", v)}
              />

              <ColorInput
                label="Color texto"
                value={safeConfig.theme.overrides["--text"] || "#F5F5F5"}
                onChange={(v) => updateThemeOverride("--text", v)}
              />

              <ColorInput
                label="Color acento"
                value={safeConfig.theme.overrides["--accentA"] || "#D4AF37"}
                onChange={(v) => updateThemeOverride("--accentA", v)}
              />

              <div style={{ marginTop: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Secciones Home</div>

                {(safeConfig.pages.home.sections || []).map((section) => (
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
              <Input label="Badge" value={safeConfig.copy.hero.badge} onChange={(v) => updateCopy("hero", "badge", v)} />
              <Input label="Título A" value={safeConfig.copy.hero.titleA} onChange={(v) => updateCopy("hero", "titleA", v)} />
              <Input label="Título Highlight" value={safeConfig.copy.hero.titleHighlight} onChange={(v) => updateCopy("hero", "titleHighlight", v)} />
              <Input label="Título B" value={safeConfig.copy.hero.titleB} onChange={(v) => updateCopy("hero", "titleB", v)} />
              <Textarea label="Subtitle" value={safeConfig.copy.hero.subtitle} onChange={(v) => updateCopy("hero", "subtitle", v)} />
              <Input label="CTA texto" value={safeConfig.copy.hero.ctaText} onChange={(v) => updateCopy("hero", "ctaText", v)} />
              <Input label="CTA href" value={safeConfig.copy.hero.ctaHref} onChange={(v) => updateCopy("hero", "ctaHref", v)} />
              <Input label="Imagen hero" value={safeConfig.copy.hero.imageSrc} onChange={(v) => updateCopy("hero", "imageSrc", v)} />
            </>
          )}

          {active === "services" && (
            <>
              <SectionTitle>Services</SectionTitle>
              <Input label="Kicker" value={safeConfig.copy.services.kicker} onChange={(v) => updateCopy("services", "kicker", v)} />
              <Input label="Título" value={safeConfig.copy.services.title} onChange={(v) => updateCopy("services", "title", v)} />
              <Textarea label="Descripción" value={safeConfig.copy.services.desc} onChange={(v) => updateCopy("services", "desc", v)} />

              <div style={{ marginTop: 18 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Items</div>
                {(safeConfig.copy.services.items || []).map((item, index) => (
                  <ArrayCard
                    key={`${item.title}-${index}`}
                    title={`Servicio ${index + 1}`}
                    onMoveUp={() => moveArrayItem("services", index, -1)}
                    onMoveDown={() => moveArrayItem("services", index, 1)}
                    onRemove={() => removeArrayItem("services", index)}
                  >
                    <Input label="Título" value={item.title} onChange={(v) => updateArrayItem("services", index, "title", v)} />
                    <Textarea label="Descripción" value={item.desc} onChange={(v) => updateArrayItem("services", index, "desc", v)} />
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

          {active === "testimonials" && (
            <>
              <SectionTitle>Testimonials</SectionTitle>

              <Input
                label="Kicker"
                value={safeConfig.copy.testimonials.kicker}
                onChange={(v) => updateCopy("testimonials", "kicker", v)}
              />

              <Input
                label="Título"
                value={safeConfig.copy.testimonials.title}
                onChange={(v) => updateCopy("testimonials", "title", v)}
              />

              <Textarea
                label="Descripción"
                value={safeConfig.copy.testimonials.desc}
                onChange={(v) => updateCopy("testimonials", "desc", v)}
              />

              <div style={{ marginTop: 18 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Opiniones</div>

                {(safeConfig.copy.testimonials.items || []).map((item, index) => (
                  <ArrayCard
                    key={`${item.name}-${index}`}
                    title={`Opinión ${index + 1}`}
                    onMoveUp={() => moveArrayItem("testimonials", index, -1)}
                    onMoveDown={() => moveArrayItem("testimonials", index, 1)}
                    onRemove={() => removeArrayItem("testimonials", index)}
                  >
                    <Input
                      label="Nombre"
                      value={item.name}
                      onChange={(v) => updateArrayItem("testimonials", index, "name", v)}
                    />

                    <Input
                      label="Servicio"
                      value={item.service}
                      onChange={(v) => updateArrayItem("testimonials", index, "service", v)}
                    />

                    <Textarea
                      label="Texto"
                      value={item.text}
                      onChange={(v) => updateArrayItem("testimonials", index, "text", v)}
                    />
                  </ArrayCard>
                ))}

                <button
                  onClick={() =>
                    addArrayItem("testimonials", {
                      name: "Nuevo cliente",
                      service: "Servicio",
                      text: "Añade aquí una opinión.",
                    })
                  }
                  style={smallButtonStyle}
                >
                  + Añadir opinión
                </button>
              </div>
            </>
          )}

          {active === "prices" && (
            <>
              <SectionTitle>Prices</SectionTitle>
              <Input label="Kicker" value={safeConfig.copy.prices.kicker} onChange={(v) => updateCopy("prices", "kicker", v)} />
              <Input label="Título" value={safeConfig.copy.prices.title} onChange={(v) => updateCopy("prices", "title", v)} />
              <Textarea label="Descripción" value={safeConfig.copy.prices.desc} onChange={(v) => updateCopy("prices", "desc", v)} />

              <div style={{ marginTop: 18 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Items</div>

                {(safeConfig.copy.prices.items || []).map((item, index) => (
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

                    <Input
                      label="Imagen (URL)"
                      value={item.image || ""}
                      onChange={(v) => updateArrayItem("prices", index, "image", v)}
                    />
                  </ArrayCard>
                ))}

                <button
                  onClick={() =>
                    addArrayItem("prices", {
                      price: "15€",
                      title: "Nuevo servicio",
                      desc: "Descripción del precio",
                      image: "",
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
              <Input label="Kicker" value={safeConfig.copy.photoStrip.kicker} onChange={(v) => updateCopy("photoStrip", "kicker", v)} />
              <Input label="Título" value={safeConfig.copy.photoStrip.title} onChange={(v) => updateCopy("photoStrip", "title", v)} />
              <Textarea label="Nota" value={safeConfig.copy.photoStrip.note} onChange={(v) => updateCopy("photoStrip", "note", v)} />

              <div style={{ marginTop: 18 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Fotos</div>

                {(safeConfig.copy.photoStrip.photos || []).map((photo, index) => (
                  <ArrayCard
                    key={`${photo}-${index}`}
                    title={`Foto ${index + 1}`}
                    onRemove={() => removePhoto(index)}
                  >
                    <Input label="URL foto" value={photo} onChange={(v) => updatePhoto(index, v)} />
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
                value={safeConfig.copy.booking.kicker}
                onChange={(v) => updateCopy("booking", "kicker", v)}
              />

              <Input
                label="Título"
                value={safeConfig.copy.booking.title}
                onChange={(v) => updateCopy("booking", "title", v)}
              />

              <Textarea
                label="Descripción"
                value={safeConfig.copy.booking.desc}
                onChange={(v) => updateCopy("booking", "desc", v)}
              />

              <Input
                label="CTA texto"
                value={safeConfig.copy.booking.ctaText}
                onChange={(v) => updateCopy("booking", "ctaText", v)}
              />

              <Input
                label="CTA href"
                value={safeConfig.copy.booking.ctaHref}
                onChange={(v) => updateCopy("booking", "ctaHref", v)}
              />

              <Input
                label="Imagen lateral izquierda"
                value={safeConfig.copy.booking.sideImages?.[0] || ""}
                onChange={(v) =>
                  updateCopy("booking", "sideImages", [
                    v,
                    safeConfig.copy.booking.sideImages?.[1] || "",
                  ])
                }
              />

              <Input
                label="Imagen lateral derecha"
                value={safeConfig.copy.booking.sideImages?.[1] || ""}
                onChange={(v) =>
                  updateCopy("booking", "sideImages", [
                    safeConfig.copy.booking.sideImages?.[0] || "",
                    v,
                  ])
                }
              />
            </>
          )}

          {active === "footer" && (
            <>
              <SectionTitle>Footer</SectionTitle>
              <Input label="Título" value={safeConfig.copy.footer.title} onChange={(v) => updateCopy("footer", "title", v)} />
              <Input label="Subtitle" value={safeConfig.copy.footer.subtitle} onChange={(v) => updateCopy("footer", "subtitle", v)} />
              <Input label="Small" value={safeConfig.copy.footer.small} onChange={(v) => updateCopy("footer", "small", v)} />
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
              {active === "hero" && <HeroSection brand={safeConfig.brand} data={safeConfig.copy.hero} />}
              {active === "services" && <ServicesSection data={safeConfig.copy.services} />}
              {active === "testimonials" && (
                <TestimonialsSection data={safeConfig.copy.testimonials} />
              )}
              {active === "prices" && <PricesSection data={safeConfig.copy.prices} />}
              {active === "photoStrip" && <PhotoStripSection data={safeConfig.copy.photoStrip} />}
              {active === "booking" && <BookingSection data={safeConfig.copy.booking} />}
              {active === "footer" && <Footer data={safeConfig.copy.footer} contact={safeConfig.contact} />}
              {active === "general" && (
                <>
                  <HeroSection brand={safeConfig.brand} data={safeConfig.copy.hero} />
                  <ServicesSection data={safeConfig.copy.services} />
                  <TestimonialsSection data={safeConfig.copy.testimonials} />
                  <PricesSection data={safeConfig.copy.prices} />
                  <PhotoStripSection data={safeConfig.copy.photoStrip} />
                  <BookingSection data={safeConfig.copy.booking} />
                  <Footer data={safeConfig.copy.footer} contact={safeConfig.contact} />
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
      <textarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={{ minHeight: 100 }} />
    </label>
  );
}

function ColorInput({ label, value, onChange }) {
  const safeValue = isValidHexColor(value) ? value : "#000000";

  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <div style={{ marginBottom: 8 }}>{label}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "56px 1fr",
          gap: 10,
          alignItems: "center",
        }}
      >
        <input
          type="color"
          value={safeValue}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: 56,
            height: 42,
            padding: 4,
            border: "1px solid var(--border)",
            borderRadius: 10,
            background: "var(--bg)",
            cursor: "pointer",
          }}
        />

        <input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
        />
      </div>
    </label>
  );
}

function isValidHexColor(value) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(String(value || "").trim());
}

function ArrayCard({ title, children, onMoveUp, onMoveDown, onRemove }) {
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
          {onMoveUp && <button onClick={onMoveUp} style={tinyButtonStyle}>↑</button>}
          {onMoveDown && <button onClick={onMoveDown} style={tinyButtonStyle}>↓</button>}
          {onRemove && <button onClick={onRemove} style={tinyButtonStyle}>Borrar</button>}
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

function QuickGenerator({ setConfig }) {
  const [form, setForm] = useState({
    name: "",
    zona: "Madrid",
    whatsapp: "",
    maps: "",
    instagram: "",
    styleVariant: "premium",
    copyVariant: "moderno",
    layoutVariant: "standard",
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const stylePresets = {
    premium: {
      preset: "goldNight",
      overrides: {
        "--bg": "#0B0B0D",
        "--card": "#141418",
        "--text": "#F5F5F5",
        "--muted": "#A1A1AA",
        "--border": "#26262B",
        "--accentA": "#D4AF37",
        "--accentB": "#9C7A2B",
        "--accentSoft": "#1A1710",
        "--radius": "16px",
        "--btnRadius": "12px",
        "--shadowY": "18px",
        "--shadowBlur": "44px",
        "--shadowOpacity": "0.24",
        "--fontDisplay": "Playfair Display, serif",
        "--fontBody": "Inter, sans-serif",
      },
    },

    urban: {
      preset: "urbanSteel",
      overrides: {
        "--bg": "#0F1115",
        "--card": "#171A21",
        "--text": "#F3F4F6",
        "--muted": "#9CA3AF",
        "--border": "#2B313D",
        "--accentA": "#60A5FA",
        "--accentB": "#2563EB",
        "--accentSoft": "#111827",
        "--radius": "16px",
        "--btnRadius": "12px",
        "--shadowY": "18px",
        "--shadowBlur": "44px",
        "--shadowOpacity": "0.22",
        "--fontDisplay": "Oswald, sans-serif",
        "--fontBody": "Inter, sans-serif",
      },
    },

    classic: {
      preset: "classicCream",
      overrides: {
        "--bg": "#F7F3EB",
        "--card": "#FFFDF8",
        "--text": "#1F2937",
        "--muted": "#6B7280",
        "--border": "#E5E7EB",
        "--accentA": "#8B5E3C",
        "--accentB": "#6F4A2F",
        "--accentSoft": "#F3E8D8",
        "--radius": "16px",
        "--btnRadius": "12px",
        "--shadowY": "16px",
        "--shadowBlur": "40px",
        "--shadowOpacity": "0.12",
        "--fontDisplay": "Playfair Display, serif",
        "--fontBody": "Inter, sans-serif",
      },
    },
  };

  const copyPresets = {
    moderno: {
      heroBadge: "💈 Barbería moderna en",
      titleB: "Cortes con estilo. Reserva en segundos.",
      subtitle:
        "Cortes modernos, degradados limpios y barba con acabado profesional. Reserva rápida por WhatsApp.",
      servicesTitle: "Todo lo que necesitas para salir impecable.",
      servicesDesc: "Precisión, estilo y resultados que se notan desde el primer vistazo.",
      bookingTitle: "Reserva tu cita en menos de 1 minuto.",
      bookingDesc: "Escríbenos por WhatsApp y te confirmamos disponibilidad.",
      footerSubtitle: "Cortes · Fade · Reserva rápida",
    },

    premium: {
      heroBadge: "💈 Experiencia premium en",
      titleB: "Imagen cuidada. Reserva rápida.",
      subtitle:
        "Un espacio pensado para quienes valoran el detalle, la precisión y un servicio a la altura.",
      servicesTitle: "Más que un corte, una experiencia.",
      servicesDesc: "Atención cuidada, técnica precisa y una imagen que habla por ti.",
      bookingTitle: "Pide tu cita y déjanos el resto.",
      bookingDesc: "Te atendemos por WhatsApp de forma rápida y sencilla.",
      footerSubtitle: "Estilo · Precisión · Reserva",
    },

    tradicional: {
      heroBadge: "💈 Barbería de confianza en",
      titleB: "Tradición, detalle y buen servicio.",
      subtitle:
        "Cortes clásicos, arreglos de barba y trato cercano para que salgas siempre como esperas.",
      servicesTitle: "Los servicios de siempre, bien hechos.",
      servicesDesc: "Profesionalidad, cercanía y resultados limpios en cada visita.",
      bookingTitle: "Reserva tu próxima cita fácilmente.",
      bookingDesc: "Contacta por WhatsApp y te confirmamos horario.",
      footerSubtitle: "Cortes · Barba · Atención cercana",
    },
  };

  const layoutPresets = {
    standard: [
      { id: "hero", enabled: true, label: "Inicio" },
      { id: "services", enabled: true, label: "Servicios" },
      { id: "testimonials", enabled: true, label: "Opiniones" },
      { id: "photoStrip", enabled: true, label: "Galería" },
      { id: "prices", enabled: true, label: "Precios" },
      { id: "booking", enabled: true, label: "Reservar" },
    ],

    photosFirst: [
      { id: "hero", enabled: true, label: "Inicio" },
      { id: "photoStrip", enabled: true, label: "Galería" },
      { id: "services", enabled: true, label: "Servicios" },
      { id: "testimonials", enabled: true, label: "Opiniones" },
      { id: "prices", enabled: true, label: "Precios" },
      { id: "booking", enabled: true, label: "Reservar" },
    ],

    pricesFirst: [
      { id: "hero", enabled: true, label: "Inicio" },
      { id: "prices", enabled: true, label: "Precios" },
      { id: "services", enabled: true, label: "Servicios" },
      { id: "testimonials", enabled: true, label: "Opiniones" },
      { id: "photoStrip", enabled: true, label: "Galería" },
      { id: "booking", enabled: true, label: "Reservar" },
    ],

    compact: [
      { id: "hero", enabled: true, label: "Inicio" },
      { id: "services", enabled: true, label: "Servicios" },
      { id: "testimonials", enabled: true, label: "Opiniones" },
      { id: "prices", enabled: true, label: "Precios" },
      { id: "booking", enabled: true, label: "Reservar" },
      { id: "photoStrip", enabled: false, label: "Galería" },
    ],
  };

  const buildHeroTitles = (name, styleVariant) => {
    const words = String(name || "Barbería").trim().split(" ").filter(Boolean);

    if (words.length === 1) {
      return {
        titleA: words[0].toUpperCase(),
        titleHighlight: "BARBER",
      };
    }

    if (styleVariant === "urban") {
      return {
        titleA: words[0].toUpperCase(),
        titleHighlight: (words[1] || "STUDIO").toUpperCase(),
      };
    }

    return {
      titleA: words[0].toUpperCase(),
      titleHighlight: words.slice(1).join(" ").toUpperCase(),
    };
  };

  const generate = () => {
    const cleanName = form.name.trim() || "Barbería";
    const zona = form.zona.trim() || "Madrid";
    const style = stylePresets[form.styleVariant];
    const copy = copyPresets[form.copyVariant];
    const layout = layoutPresets[form.layoutVariant];
    const heroTitles = buildHeroTitles(cleanName, form.styleVariant);

    const cleanWhatsapp = String(form.whatsapp || "").replace(/\s+/g, "");
    const whatsappLink = cleanWhatsapp
      ? `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
        `Hola, quiero reservar una cita en ${cleanName} 💈`
      )}`
      : "";

    const heroImageByStyle = {
      premium:
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80",
      urban:
        "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=80",
      classic:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
    };

    const galleryByStyle = {
      premium: [
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80",
      ],
      urban: [
        "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80",
      ],
      classic: [
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80",
      ],
    };

    setConfig((prev) =>
      ensureConfigShape({
        ...prev,

        brand: {
          ...(prev?.brand || {}),
          name: cleanName,
          tagline: `Barbería en ${zona} · Reserva rápida`,
        },

        links: {
          ...(prev?.links || {}),
          whatsapp: whatsappLink,
          instagram: form.instagram.trim(),
          maps: form.maps.trim(),
        },

        contact: {
          ...(prev?.contact || {}),
          address: zona,
          phone: cleanWhatsapp,
          phoneTel: cleanWhatsapp ? `+${cleanWhatsapp}` : "",
          phoneDisplay: cleanWhatsapp
            ? `(+${cleanWhatsapp.slice(0, 2)}) ${cleanWhatsapp.slice(2)}`
            : "",
        },

        theme: {
          ...(prev?.theme || {}),
          preset: style.preset,
          overrides: { ...style.overrides },
        },

        pages: {
          ...(prev?.pages || {}),
          home: {
            ...(prev?.pages?.home || {}),
            sections: layout,
          },
        },

        bookingPlatform: {
          type: "none",
          label: "Reservar",
          url: "",
        },

        copy: {
          ...(prev?.copy || {}),

          hero: {
            ...(prev?.copy?.hero || {}),
            badge: `${copy.heroBadge} ${zona}`,
            titleA: heroTitles.titleA,
            titleHighlight: heroTitles.titleHighlight,
            titleB: copy.titleB,
            subtitle: copy.subtitle,
            ctaText: "Reservar por WhatsApp",
            ctaHref: whatsappLink,
            imageSrc: heroImageByStyle[form.styleVariant],
          },

          services: {
            ...(prev?.copy?.services || {}),
            kicker: "Servicios",
            title: copy.servicesTitle,
            desc: copy.servicesDesc,
            items: [
              {
                title:
                  form.styleVariant === "classic"
                    ? "Corte clásico"
                    : "Corte personalizado",
                desc:
                  form.styleVariant === "classic"
                    ? "Técnica tradicional con acabado limpio y profesional."
                    : "Adaptado a tu estilo, facciones y rutina diaria.",
              },
              {
                title:
                  form.styleVariant === "urban"
                    ? "Fade / degradado"
                    : "Barba y perfilado",
                desc:
                  form.styleVariant === "urban"
                    ? "Transiciones limpias y acabado moderno."
                    : "Definición, recorte y limpieza para un look completo.",
              },
              {
                title:
                  form.styleVariant === "premium"
                    ? "Corte + barba"
                    : "Arreglo completo",
                desc:
                  form.styleVariant === "premium"
                    ? "Servicio completo para una imagen impecable."
                    : "Una opción completa para salir perfecto.",
              },
            ],
          },

          testimonials: {
            ...(prev?.copy?.testimonials || {}),
            kicker: "Opiniones",
            title: "Clientes que vuelven por algo.",
            desc: "Confianza, detalle y resultados que se notan desde la primera visita.",
            items: [
              {
                name: "Carlos M.",
                service: "Corte + barba",
                text: "Muy buen trato y un resultado impecable. Se nota el detalle y la profesionalidad.",
              },
              {
                name: "Adrián R.",
                service: "Fade",
                text: "Reserva rápida por WhatsApp y corte muy limpio. Muy recomendable.",
              },
              {
                name: "Javi P.",
                service: "Arreglo de barba",
                text: "La mejor barbería de la zona. Buen ambiente y servicio muy cuidado.",
              },
            ],
          },

          photoStrip: {
            ...(prev?.copy?.photoStrip || {}),
            kicker: form.styleVariant === "premium" ? "Galería" : "Trabajos",
            title:
              form.styleVariant === "classic"
                ? "Detalles de una barbería de verdad."
                : "Así se ve un buen corte.",
            note:
              form.styleVariant === "premium"
                ? "Estilo, detalle y presencia."
                : "Imagen, detalle y acabado profesional.",
            photos: galleryByStyle[form.styleVariant],
          },

          prices: {
            ...(prev?.copy?.prices || {}),
            kicker: "Precios",
            title:
              form.layoutVariant === "pricesFirst"
                ? "Precios visibles desde el primer momento."
                : "Tarifas claras, sin complicaciones.",
            desc: "Elige tu servicio y reserva en un momento.",
            items: [
              {
                price: form.styleVariant === "premium" ? "18€" : "15€",
                title: "Corte",
                desc: "Corte con acabado y peinado.",
                image:
                  "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80",
              },
              {
                price: form.styleVariant === "premium" ? "25€" : "20€",
                title: "Corte + barba",
                desc: "Servicio completo.",
                image:
                  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80",
              },
              {
                price: form.styleVariant === "classic" ? "12€" : "10€",
                title: "Arreglo de barba",
                desc: "Perfilado profesional.",
                image:
                  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80",
              },
            ],
          },

          booking: {
            ...(prev?.copy?.booking || {}),
            kicker: "Reserva",
            title: copy.bookingTitle,
            desc: copy.bookingDesc,
            ctaText: "Abrir WhatsApp",
            ctaHref: whatsappLink,
            sideImages: [
              "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80",
            ],
          },

          footer: {
            ...(prev?.copy?.footer || {}),
            title: cleanName,
            subtitle: copy.footerSubtitle,
            small: "© 2026",
          },
        },
      })
    );
  };

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg)",
        borderRadius: 14,
        padding: 14,
        marginBottom: 18,
      }}
    >
      <Input label="Nombre barbería" value={form.name} onChange={(v) => update("name", v)} />
      <Input label="Zona" value={form.zona} onChange={(v) => update("zona", v)} />
      <Input
        label="WhatsApp (ej: 34612345678)"
        value={form.whatsapp}
        onChange={(v) => update("whatsapp", v)}
      />
      <Input label="Google Maps URL" value={form.maps} onChange={(v) => update("maps", v)} />
      <Input
        label="Instagram URL"
        value={form.instagram}
        onChange={(v) => update("instagram", v)}
      />

      <label style={{ display: "block", marginBottom: 12 }}>
        <div>Estilo visual</div>
        <select
          value={form.styleVariant}
          onChange={(e) => update("styleVariant", e.target.value)}
        >
          <option value="premium">Premium</option>
          <option value="urban">Urbana</option>
          <option value="classic">Clásica</option>
        </select>
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <div>Tono del copy</div>
        <select
          value={form.copyVariant}
          onChange={(e) => update("copyVariant", e.target.value)}
        >
          <option value="moderno">Moderno</option>
          <option value="premium">Premium</option>
          <option value="tradicional">Tradicional</option>
        </select>
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <div>Orden de secciones</div>
        <select
          value={form.layoutVariant}
          onChange={(e) => update("layoutVariant", e.target.value)}
        >
          <option value="standard">Estándar</option>
          <option value="photosFirst">Fotos primero</option>
          <option value="pricesFirst">Precios primero</option>
          <option value="compact">Compacta</option>
        </select>
      </label>

      <button onClick={generate} style={smallButtonStyle}>
        Generar web automática
      </button>
    </div>
  );
}

function ClientLoader({ setConfig }) {
  const [selected, setSelected] = useState("");

  const loadClient = () => {
    if (!selected) return;

    const foundConfig = clientConfigs[selected];
    if (!foundConfig) return;

    setConfig(ensureConfigShape(foundConfig));
  };

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg)",
        borderRadius: 14,
        padding: 14,
      }}
    >
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{ marginBottom: 12 }}
      >
        <option value="">Selecciona un cliente</option>

        {Object.keys(clientConfigs).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <button onClick={loadClient} style={smallButtonStyle}>
        Cargar config
      </button>
    </div>
  );
}