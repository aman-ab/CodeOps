// a plain component — not a route
export default function CategoryBar() {
  const categories = ["All", "Mains", "Vegan", "Breakfast"];
  return (
    <div className="my-4 flex gap-2">
      {categories.map((c) => (
        <span key={c} className="rounded-full border px-3 py-1 text-sm">{c}</span>
      ))}
    </div>
  );
}
