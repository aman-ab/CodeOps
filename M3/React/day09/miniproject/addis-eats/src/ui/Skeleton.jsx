// A shape roughly the size of what is coming, so the layout doesn't jump and the wait feels shorter.
// (Plain inline styles — style.css is not edited.)
const block = (height) => ({
  background: "#e3e3e3",
  borderRadius: 6,
  height,
  margin: "14px auto",
  maxWidth: 560,
});

export function PageSkeleton() {
  return (
    <div className="main-c" role="status" aria-label="Loading the page">
      <div style={{ ...block(30), maxWidth: 220 }} />
      <div style={block(90)} />
      <div style={block(90)} />
      <div style={{ ...block(44), maxWidth: 200 }} />
    </div>
  );
}
