export default function Button({
  children,
  href,
  target = "_self",
  rel,
  variant = "primary",
  onClick,
  style = {},
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "14px 22px",
    borderRadius: "var(--btnRadius)",
    fontWeight: 800,
    fontSize: 15,
    letterSpacing: "-0.01em",
    border: "1px solid transparent",
    cursor: "pointer",
    transition:
      "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease, color 0.25s ease",
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  const variants = {
    primary: {
      background: "var(--accentA)",
      color: "#111",
      borderColor: "rgba(0,0,0,0.04)",
      boxShadow: "0 14px 30px rgba(0,0,0,0.14)",
    },
    secondary: {
      background: "rgba(255,255,255,0.03)",
      color: "var(--text)",
      borderColor: "var(--border)",
      boxShadow: "none",
    },
  };

  const finalStyle = {
    ...base,
    ...(variants[variant] || variants.primary),
    ...style,
  };

  const hoverHandlers =
    variant === "primary"
      ? {
          onMouseEnter: (e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 18px 34px rgba(0,0,0,0.18)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = finalStyle.boxShadow || "none";
          },
        }
      : {
          onMouseEnter: (e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.borderColor = "rgba(212,175,55,0.24)";
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = finalStyle.borderColor || "var(--border)";
            e.currentTarget.style.background = finalStyle.background || "transparent";
          },
        };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        style={finalStyle}
        {...hoverHandlers}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} style={finalStyle} {...hoverHandlers}>
      {children}
    </button>
  );
}