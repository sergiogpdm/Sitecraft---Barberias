export const mvpBarberStudioConfig = {
  brand: {
    name: "MVP Barber Studio",
    tagline: "Cortes modernos · Reserva rápida",
    emojiLogo: "💈",
    logoImage: ""
  },

  links: {
    whatsapp: "https://wa.me/34600000000?text=Hola%2C%20quiero%20reservar%20una%20cita%20en%20MVP%20Barber%20Studio%20%F0%9F%92%88",
    instagram: "https://instagram.com/mvpbarberstudio",
    maps: "https://maps.app.goo.gl/dfMmks2CFvJJCnpF6"
  },

  contact: {
    phoneDisplay: "(+34) 600 000 000",
    phoneTel: "+34600000000",
    email: "info@mvpbarberstudio.com",
    address: "Madrid",
    hours: "Lun-Sáb · 10:00–21:00",
    phone: "600000000"
  },

  layout: {
    showNavbarCta: true,
    showFloatingWhatsApp: true
  },

  theme: {
    preset: "urbanSteel",
    mode: "flat",
    scheme: "dark",
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
      "--fontBody": "Inter, sans-serif"
    }
  },

  pages: {
    home: {
      sections: [
        { id: "hero", enabled: true, label: "Inicio" },
        { id: "services", enabled: true, label: "Servicios" },
        { id: "photoStrip", enabled: true, label: "Galería" },
        { id: "prices", enabled: true, label: "Precios" },
        { id: "booking", enabled: true, label: "Reservar" }
      ]
    },
    customize: {
      enabled: true
    }
  },

  copy: {
    hero: {
      badge: "💈 Barbería moderna en Madrid",
      titleA: "MVP",
      titleHighlight: "BARBER",
      titleB: "Studio con estilo propio.",
      subtitle:
        "Cortes modernos, degradados limpios y perfilado profesional. Reserva fácil y rápida por WhatsApp.",
      ctaText: "Reservar por WhatsApp",
      ctaHref:
        "https://wa.me/34600000000?text=Hola%2C%20quiero%20reservar%20una%20cita%20en%20MVP%20Barber%20Studio%20%F0%9F%92%88",
      imageSrc:
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80"
    },

    services: {
      kicker: "Servicios",
      title: "Cortes que hablan por ti.",
      desc: "Técnica, detalle y estilo en cada sesión.",
      items: [
        {
          title: "Corte personalizado",
          desc: "Adaptado a tu estilo y a la forma de tu rostro."
        },
        {
          title: "Fade / degradado",
          desc: "Acabado limpio y preciso."
        },
        {
          title: "Barba y perfilado",
          desc: "Definición y equilibrio para un look completo."
        }
      ]
    },

    photoStrip: {
      kicker: "Resultados",
      title: "Así se ve un trabajo bien hecho.",
      note: "Estilo, detalle y acabado profesional.",
      photos: [
        "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80"
      ]
    },

    prices: {
      kicker: "Precios",
      title: "Servicios claros, precios claros.",
      desc: "Reserva rápido y sin complicaciones.",
      items: [
        { price: "15€", title: "Corte", desc: "Acabado y peinado incluidos." },
        { price: "22€", title: "Corte + barba", desc: "Pack completo." },
        { price: "10€", title: "Barba", desc: "Perfilado profesional." }
      ]
    },

    booking: {
      kicker: "Reserva",
      title: "Tu próxima cita, en menos de un minuto.",
      desc: "Escríbenos por WhatsApp y te confirmamos disponibilidad.",
      ctaText: "Abrir WhatsApp",
      ctaHref:
        "https://wa.me/34600000000?text=Hola%2C%20quiero%20reservar%20una%20cita%20en%20MVP%20Barber%20Studio%20%F0%9F%92%88"
    },

    footer: {
      title: "MVP Barber Studio",
      subtitle: "Cortes · Fade · Reserva rápida",
      small: "© 2026"
    }
  }
};