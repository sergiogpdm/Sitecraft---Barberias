import { useState } from "react";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import InternalBookingForm from "./booking/InternalBookingForm.jsx";

function resolveBookingLink(config) {
  const type = config?.bookingPlatform?.type || "whatsapp";
  const customUrl = config?.bookingPlatform?.url || "";
  const whatsappUrl = config?.links?.whatsapp || "";

  if (type === "none") {
    return {
      href: "",
      label: config?.bookingPlatform?.label || "Reservar",
      type,
    };
  }

  if (type === "internal") {
    return {
      href: "#",
      label: config?.bookingPlatform?.label || "Reservar",
      type,
    };
  }

  if (type === "whatsapp") {
    return {
      href: whatsappUrl,
      label: config?.bookingPlatform?.label || "Reservar",
      type,
    };
  }

  if (type === "yeasy") {
    return {
      href: customUrl,
      label: config?.bookingPlatform?.label || "YEASY",
      type,
    };
  }

  if (type === "booksy") {
    return {
      href: customUrl,
      label: config?.bookingPlatform?.label || "Booksy",
      type,
    };
  }

  if (type === "custom") {
    return {
      href: customUrl,
      label: config?.bookingPlatform?.label || "Reservar",
      type,
    };
  }

  return {
    href: whatsappUrl,
    label: config?.bookingPlatform?.label || "Reservar",
    type,
  };
}

export default function FloatingBookingButton() {
  const { config } = useSiteConfig();

  const booking = resolveBookingLink(config);

  const [openInternalBooking, setOpenInternalBooking] = useState(false);

  if (!config?.layout?.showFloatingBooking) return null;
  if (!booking?.href) return null;
  if (config?.bookingPlatform?.type === "none") return null;

  const services =
    config?.copy?.prices?.items ||
    config?.copy?.prices?.services ||
    [];

  const handleClick = (e) => {
    if (booking.type === "internal") {
      e.preventDefault();
      setOpenInternalBooking(true);
    }
  };

  return (
    <>
      <a
        href={booking.href}
        target={booking.type !== "internal" ? "_blank" : undefined}
        rel={booking.type !== "internal" ? "noreferrer" : undefined}
        className="floating-booking-btn"
        onClick={handleClick}
      >
        {booking.label}
      </a>

      {openInternalBooking && (
        <InternalBookingForm
          services={services}
          onClose={() => setOpenInternalBooking(false)}
        />
      )}
    </>
  );
}