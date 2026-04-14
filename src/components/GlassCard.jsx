export default function GlassCard({ children, style = {} }) {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        boxShadow: "0 var(--shadowY) var(--shadowBlur) rgba(0,0,0,var(--shadowOpacity))",
        backdropFilter: "blur(8px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}