export default function DishSkeleton({ count = 6 }) {
  return (
    <div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading dishes"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card overflow-hidden">
          <div className="skeleton aspect-[4/3] w-full rounded-none" />
          <div className="space-y-3 p-5">
            <div className="skeleton h-4 w-24" />
            <div className="skeleton h-6 w-2/3" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-9 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
