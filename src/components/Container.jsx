export default function Container({ children, style = {}, wide = false }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: wide ? 1400 : 1200,
        margin: "0 auto",
        padding: wide ? "0 32px" : "0 20px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}