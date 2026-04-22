import { useSiteConfig } from "../context/SiteConfigContext.jsx";

function resolveBookingLink(config) {
  const type = config?.bookingPlatform?.type || "whatsapp";
  const customUrl = config?.bookingPlatform?.url || "";
  const whatsappUrl = config?.links?.whatsapp || "";

  if (type === "none") {
    return { href: "", label: config?.bookingPlatform?.label || "Reservar" };
  }

  if (type === "whatsapp") {
    return {
      href: whatsappUrl,
      label: config?.bookingPlatform?.label || "Reservar",
    };
  }

  if (type === "yeasy") {
    return {
      href: customUrl,
      label: config?.bookingPlatform?.label || "Yeasy",
    };
  }

  if (type === "booksy") {
    return {
      href: customUrl,
      label: config?.bookingPlatform?.label || "Booksy",
    };
  }

  if (type === "custom") {
    return {
      href: customUrl,
      label: config?.bookingPlatform?.label || "Reservar",
    };
  }

  return {
    href: whatsappUrl,
    label: config?.bookingPlatform?.label || "Reservar",
  };
}

export default function FloatingBookingButton() {
  const { config } = useSiteConfig();
  const booking = resolveBookingLink(config);

  if (!config?.layout?.showFloatingBooking) return null;
  if (!booking?.href) return null;
  if (config?.bookingPlatform?.type === "none") return null;

  return (
    <a
      href={booking.href}
      target="_blank"
      rel="noreferrer"
      className="floating-booking-btn"
    >
      {booking.label}
    </a>
  );
}