export default function GlassCard({ children, style = {} }) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow:
          "0 var(--shadowY) var(--shadowBlur) rgba(0,0,0,var(--shadowOpacity))",
        ...style,
      }}
    >
      {children}
    </div>
  );
}