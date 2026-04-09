export const clientTemplate = {
  brand: {
    name: "Nombre Barbería",
    tagline: "Cortes premium · Reserva rápida",
    emojiLogo: "💈",
    logoImage: ""
  },

  links: {
    whatsapp: "https://wa.me/34600000000?text=Hola%2C%20quiero%20reservar%20una%20cita%20%F0%9F%92%88",
    instagram: "https://instagram.com/barberia",
    maps: "https://www.google.com/maps/search/?api=1&query=Barberia+Madrid"
  },

  contact: {
    phoneDisplay: "(+34) 600 000 000",
    phoneTel: "+34600000000",
    email: "info@barberia.com",
    address: "Calle Ejemplo, 1 · Madrid",
    hours: "Lun-Sáb · 10:00–21:00",
    phone: "600000000"
  },

  layout: {
    showNavbarCta: true,
    showFloatingWhatsApp: true
  },

  theme: {
    preset: "goldNight",
    mode: "flat",
    scheme: "dark",
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
      badge: "💈 Barbería en Madrid",
      titleA: "NOMBRE",
      titleHighlight: "BARBER",
      titleB: "Cortes con estilo. Reserva en segundos.",
      subtitle:
        "Corte clásico, degradados y barba con acabado profesional. Reserva rápida por WhatsApp.",
      ctaText: "Reservar por WhatsApp",
      ctaHref:
        "https://wa.me/34600000000?text=Hola%2C%20quiero%20reservar%20una%20cita%20%F0%9F%92%88",
      imageSrc:
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80"
    },

    services: {
      kicker: "Servicios",
      title: "Todo lo que necesitas para salir impecable.",
      desc: "Servicio preciso, trato cercano y resultados que se notan.",
      items: [
        {
          title: "Corte clásico o moderno",
          desc: "Adaptado a tu estilo y a tu día a día."
        },
        {
          title: "Fade / degradado",
          desc: "Transiciones limpias con acabado profesional."
        },
        {
          title: "Barba y perfilado",
          desc: "Recorte, definición y limpieza para un look completo."
        }
      ]
    },

    photoStrip: {
      kicker: "Trabajos",
      title: "Así se ve un buen corte.",
      note: "Imagen, detalle y acabado profesional.",
      photos: [
        "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80"
      ]
    },

    prices: {
      kicker: "Precios",
      title: "Tarifas claras, sin complicaciones.",
      desc: "Elige tu servicio y reserva en un momento.",
      items: [
        { price: "15€", title: "Corte", desc: "Corte con acabado y peinado." },
        { price: "20€", title: "Corte + barba", desc: "Servicio completo." },
        { price: "10€", title: "Arreglo de barba", desc: "Perfilado profesional." }
      ]
    },

    booking: {
      kicker: "Reserva",
      title: "Reserva tu cita en menos de 1 minuto.",
      desc: "Escríbenos por WhatsApp y te confirmamos disponibilidad.",
      ctaText: "Abrir WhatsApp",
      ctaHref:
        "https://wa.me/34600000000?text=Hola%2C%20quiero%20reservar%20una%20cita%20%F0%9F%92%88"
    },

    footer: {
      title: "Nombre Barbería",
      subtitle: "Cortes · Barba · Reserva rápida",
      small: "© 2026"
    }
  }
};