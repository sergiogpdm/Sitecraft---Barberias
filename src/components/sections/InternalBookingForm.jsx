import { useEffect, useMemo, useState } from "react";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

export default function InternalBookingForm({ services = [], onClose }) {
  const { config } = useSiteConfig();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, []);

  const today = startOfDay(new Date());

  const serviceOptions = useMemo(() => {
    return (services || [])
      .filter((item) => item?.title)
      .map((item) => ({
        title: item.title,
        price: item.price || "",
        desc: item.desc || "",
      }));
  }, [services]);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState(
    serviceOptions[0] || { title: "Servicio", price: "", desc: "" }
  );

  const calendarDays = useMemo(
    () => buildCalendarDays(currentMonth),
    [currentMonth]
  );

  const availableTimes = useMemo(() => {
    return getAvailableTimes(selectedDate);
  }, [selectedDate]);

  const canContinue = selectedService?.title && selectedDate && selectedTime;

  const goPrevMonth = () => {
    const prev = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );

    const currentRealMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    if (prev < currentRealMonth) return;

    setCurrentMonth(prev);
    setSelectedTime("");
  };

  const goNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
    setSelectedTime("");
  };

  const handleContinue = () => {
    const reservationDraft = {
      barberiaId:
        config?.bookingPlatform?.barberiaId ||
        config?.brand?.name?.toLowerCase().replace(/\s+/g, "-") ||
        "barberia-demo",
      service: selectedService.title,
      price: selectedService.price,
      date: toDateInputValue(selectedDate),
      time: selectedTime,
      status: "draft",
      createdAt: new Date().toISOString(),
    };

    console.log("Reserva pendiente de confirmar:", reservationDraft);
    alert("Siguiente paso: confirmar datos del cliente.");
  };

  return (
    <div className="internal-booking-screen">
      <div className="internal-booking-panel internal-booking-panel-large">
        <button
          type="button"
          className="internal-booking-close"
          onClick={onClose}
          aria-label="Cerrar reserva"
        >
          ×
        </button>

        <div className="internal-booking-layout internal-booking-layout-large">
          <div className="internal-booking-calendar">
            <span className="internal-booking-kicker">Reserva online</span>

            <h2>Elige día y hora</h2>

            <p>
              Los días pasados aparecen bloqueados. Selecciona una fecha
              disponible y una hora para continuar.
            </p>

            <div className="booking-calendar-box">
              <div className="booking-calendar-head">
                <button
                  type="button"
                  onClick={goPrevMonth}
                  className="booking-calendar-nav"
                  disabled={
                    currentMonth.getFullYear() === today.getFullYear() &&
                    currentMonth.getMonth() === today.getMonth()
                  }
                >
                  ←
                </button>

                <div>
                  <strong>{formatMonth(currentMonth)}</strong>
                  <span>{currentMonth.getFullYear()}</span>
                </div>

                <button
                  type="button"
                  onClick={goNextMonth}
                  className="booking-calendar-nav"
                >
                  →
                </button>
              </div>

              <div className="booking-calendar-weekdays">
                <span>Lun</span>
                <span>Mar</span>
                <span>Mié</span>
                <span>Jue</span>
                <span>Vie</span>
                <span>Sáb</span>
                <span>Dom</span>
              </div>

              <div className="booking-calendar-grid">
                {calendarDays.map((day, index) => {
                  const isPastDay = day.date < today;
                  const isCurrentMonth =
                    day.date.getMonth() === currentMonth.getMonth();
                  const isSelected = isSameDay(day.date, selectedDate);
                  const isToday = isSameDay(day.date, today);

                  return (
                    <button
                      key={`${day.date.toISOString()}-${index}`}
                      type="button"
                      disabled={isPastDay || !isCurrentMonth}
                      onClick={() => {
                        setSelectedDate(day.date);
                        setSelectedTime("");
                      }}
                      className={[
                        "booking-calendar-day",
                        !isCurrentMonth ? "is-outside" : "",
                        isPastDay ? "is-disabled" : "",
                        isSelected ? "is-selected" : "",
                        isToday ? "is-today" : "",
                      ].join(" ")}
                    >
                      <span>{day.date.getDate()}</span>
                      {isPastDay ? <small>No disponible</small> : null}
                      {isToday && !isPastDay ? <small>Hoy</small> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="internal-booking-times">
              <div className="internal-booking-times-title">
                Horas disponibles para {formatDate(selectedDate)}
              </div>

              <div className="internal-booking-time-grid">
                {availableTimes.length ? (
                  availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={
                        selectedTime === time
                          ? "internal-booking-time is-selected"
                          : "internal-booking-time"
                      }
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <div className="internal-booking-empty">
                    No quedan horas disponibles para este día.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="internal-booking-summary">
            <span className="internal-booking-kicker">Servicio</span>

            <h3>¿Qué quieres reservar?</h3>

            <div className="internal-booking-services">
              {serviceOptions.map((service) => (
                <button
                  key={service.title}
                  type="button"
                  className={
                    selectedService?.title === service.title
                      ? "internal-booking-service is-selected"
                      : "internal-booking-service"
                  }
                  onClick={() => setSelectedService(service)}
                >
                  <div>
                    <strong>{service.title}</strong>
                    {service.desc ? <span>{service.desc}</span> : null}
                  </div>

                  {service.price ? <b>{service.price}</b> : null}
                </button>
              ))}
            </div>

            <div className="internal-booking-resume">
              <div>
                <span>Servicio</span>
                <strong>{selectedService?.title || "Sin elegir"}</strong>
              </div>

              <div>
                <span>Precio</span>
                <strong>{selectedService?.price || "Consultar"}</strong>
              </div>

              <div>
                <span>Día</span>
                <strong>{formatDate(selectedDate)}</strong>
              </div>

              <div>
                <span>Hora</span>
                <strong>{selectedTime || "Sin elegir"}</strong>
              </div>
            </div>

            <button
              type="button"
              className="internal-booking-continue"
              disabled={!canContinue}
              onClick={handleContinue}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function buildCalendarDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;

  const calendarStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);

    return {
      date: startOfDay(date),
    };
  });
}

function getAvailableTimes(selectedDate) {
  const now = new Date();
  const today = startOfDay(now);

  const baseTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ];

  if (!isSameDay(selectedDate, today)) return baseTimes;

  return baseTimes.filter((time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const slotDate = new Date();
    slotDate.setHours(hours, minutes, 0, 0);

    return slotDate > now;
  });
}

function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatMonth(date) {
  return date.toLocaleDateString("es-ES", {
    month: "long",
  });
}

function formatDate(date) {
  if (!date) return "Sin elegir";

  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}