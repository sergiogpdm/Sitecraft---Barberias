export const siteConfig = {
  brand: {
    name: "Inmortal Barber Concept",
    tagline: "Barbería premium · Estilo limpio · Reserva rápida",
    emojiLogo: "✂️",
    logoImage: "/logos/inmortal-logo.png",
  },

  links: {
    whatsapp: "https://wa.me/34600000000",
    instagram: "https://www.instagram.com/inmortalbarberconcept/",
    maps: "https://maps.google.com",
  },

  contact: {
    phoneDisplay: "+34 600 000 000",
    phoneTel: "+34600000000",
    email: "info@inmortalbarberconcept.com",
    address: "Madrid",
    hours: "Lun-Sáb · 10:00–21:00",
    phone: "+34600000000",
  },

  layout: {
    showNavbarCta: true,
    showFloatingWhatsApp: true,
    showFloatingBooking: true,
  },

  theme: {
    preset: "cleanLuxury",
    mode: "flat",
    scheme: "light",

    overrides: {
      "--bg": "#F4F2EE",
      "--card": "#FFFFFF",
      "--surface": "#E7E3DC",

      "--text": "#111111",
      "--muted": "#4B4B4B",

      "--border": "#D6D0C7",

      "--accentA": "#B11217",
      "--accentB": "#8F8F8F",
      "--accentSoft": "#EFE8E2",

      "--accentText": "#FFFFFF",

      "--accentCard": "#C9C3B8",
      "--accentCardText": "#111111",

      "--buttonText": "#FFFFFF",
      "--buttonBg": "#B11217",

      "--buttonSecondaryBg": "#111111",
      "--buttonSecondaryText": "#FFFFFF",

      "--radius": "18px",
      "--btnRadius": "14px",

      "--shadowY": "16px",
      "--shadowBlur": "38px",
      "--shadowOpacity": "0.12",

      "--fontDisplay": "Playfair Display, serif",
      "--fontBody": "Inter, sans-serif",
    },
  },

  pages: {
    home: {
      sections: [
        {
          id: "hero",
          enabled: true,
          label: "Inicio",
        },
        {
          id: "about",
          enabled: true,
          label: "Nosotros",
        },
        {
          id: "prices",
          enabled: true,
          label: "Servicios",
        },
        {
          id: "testimonials",
          enabled: true,
          label: "Opiniones",
        },
        {
          id: "photoStrip",
          enabled: true,
          label: "Galería",
        },
        {
          id: "booking",
          enabled: true,
          label: "Reservar",
        },
      ],
    },

    customize: {
      enabled: true,
    },
  },

  copy: {
    hero: {
      badge: "⚡ Imagen premium · Precisión · Detalle",

      titleA: "INMORTAL",
      titleHighlight: "BARBER",
      titleB: "CONCEPT",

      subtitle:
        "Diseño limpio, técnica precisa y una experiencia creada para quienes cuidan cada detalle de su imagen.",

      ctaText: "Reservar cita",
      ctaHref: "",

      imageSrc: "/fondos/inmortal-hero.webp",
    },

    services: {
      kicker: "Servicios",

      title: "Una imagen que deja huella.",

      desc:
        "Cortes modernos, acabados precisos y atención personalizada en un entorno elegante y minimalista.",

      items: [
        {
          title: "Corte premium",
          desc:
            "Fade, textura y acabado profesional adaptado a tu estilo.",
        },

        {
          title: "Barba & perfilado",
          desc:
            "Definición precisa y cuidado completo para una barba impecable.",
        },

        {
          title: "Experiencia completa",
          desc:
            "Corte + barba + acabado para una imagen totalmente cuidada.",
        },
      ],
    },

    photoStrip: {
      kicker: "Galería",

      title: "Limpio. Preciso. Inmortal.",

      note: "Cada detalle cuenta.",

      photos: [
        "/imagenes/inmortal1.jpg",
        "/imagenes/inmortal2.jpg",
        "/imagenes/inmortal3.jpg",
      ],
    },

    prices: {
      kicker: "Tarifas",

      title: "Servicios premium, precios claros.",

      desc:
        "Reserva rápida y resultados que hablan por sí solos.",

      items: [
        {
          price: "20€",
          title: "Corte premium",
          desc:
            "Corte personalizado con styling final.",
          image: "/imagenes/inmortal1.jpg",
        },

        {
          price: "28€",
          title: "Corte + barba",
          desc:
            "Servicio completo con perfilado y acabado.",
          image: "/imagenes/inmortal2.jpg",
        },

        {
          price: "12€",
          title: "Barba",
          desc:
            "Perfilado y definición profesional.",
          image: "/imagenes/inmortal3.jpg",
        },
      ],
    },

    booking: {
      kicker: "Reserva",

      title: "Tu próxima cita empieza aquí.",

      desc:
        "Elige día, hora y deja el resto en nuestras manos.",

      ctaText: "Reservar ahora",

      ctaHref: "https://booksy.com",

      sideImages: [
        "/imagenes/inmortal-side1.jpg",
        "/imagenes/inmortal-side2.jpg",
      ],
    },

    testimonials: {
      kicker: "Opiniones",

      title: "Clientes que vuelven por la experiencia.",

      desc:
        "Precisión, ambiente y atención cuidada en cada visita.",

      items: [
        {
          name: "David R.",
          service: "Corte premium",
          text:
            "La barbería más limpia y profesional en la que he estado.",
        },

        {
          name: "Sergio M.",
          service: "Fade",
          text:
            "Atención increíble y acabados perfectos.",
        },

        {
          name: "Alex P.",
          service: "Corte + barba",
          text:
            "El local transmite elegancia desde que entras.",
        },
      ],
    },

    about: {
      kicker: "Nosotros",

      title: "No seguimos tendencias. Creamos identidad.",

      desc:
        "En Inmortal Barber Concept trabajamos cada corte con precisión, estética y personalidad. Un espacio donde el detalle, la limpieza visual y la experiencia premium forman parte de cada servicio.",

      image: "/imagenes/inmortal-about.jpg",

      points: [
        "Precisión premium",
        "Diseño minimalista",
        "Atención personalizada",
      ],
    },

    footer: {
      title: "Inmortal Barber Concept",
      subtitle: "Precisión · Estilo · Identidad",
      small: "© 2026",
    },
  },

  bookingPlatform: {
    type: "internal",

    label: "Reservar",

    url: "https://booksy.com",

    barberiaId: "inmortal-barber-concept",
  },
};