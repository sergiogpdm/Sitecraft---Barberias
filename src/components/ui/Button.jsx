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
    padding: "14px 22px",
    borderRadius: "var(--btnRadius)",
    fontWeight: 700,
    border: "1px solid var(--border)",
    cursor: "pointer",
    transition: "0.2s ease",
    textDecoration: "none",
  };

  const variants = {
    primary: {
      background: "var(--accentA)",
      color: "#111",
      border: "1px solid var(--accentA)",
    },
    secondary: {
      background: "transparent",
      color: "var(--text)",
      border: "1px solid var(--border)",
    },
  };

  const finalStyle = {
    ...base,
    ...(variants[variant] || variants.primary),
    ...style,
  };

  if (href) {
    return (
      <a href={href} target={target} rel={rel} style={finalStyle}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} style={finalStyle}>
      {children}
    </button>
  );
}