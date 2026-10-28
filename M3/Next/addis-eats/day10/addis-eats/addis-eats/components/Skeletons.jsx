// Skeletons the SHAPE of what is coming, at the same height, so nothing jumps when the data lands.
export function TableSkeleton({ rows = 5, label = "Loading" }) {
  return (
    <div role="status" aria-label={label} className="space-y-2">
      <div className="h-6 w-56 animate-pulse rounded bg-stone-300" />
      <div className="h-9 animate-pulse rounded bg-stone-300" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 animate-pulse rounded bg-stone-200" />
      ))}
    </div>
  );
}

// 300 px = the fixed height of the real charts
export function ChartSkeleton({ label }) {
  return (
    <div role="status" aria-label={label} className="space-y-2">
      <div className="h-6 w-64 animate-pulse rounded bg-stone-300" />
      <div className="h-[300px] animate-pulse rounded bg-stone-200" />
    </div>
  );
}
