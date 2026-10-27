export default function Loading() {
  return (
    <div className="page" aria-busy="true" aria-live="polite">
      <div className="skeleton h-10 w-56" />
      <div className="skeleton mt-4 h-5 w-80 max-w-full" />
      <div className="skeleton mt-8 h-64 w-full" />
    </div>
  );
}
