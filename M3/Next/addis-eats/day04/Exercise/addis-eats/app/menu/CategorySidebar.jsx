import LayoutCounter from "./LayoutCounter";

// SERVER component: static markup + one client leaf.
export default function CategorySidebar() {
  const categories = ["Mains", "Vegan", "Breakfast"];
  return (
    <aside className="w-44 shrink-0 space-y-3">
      <h2 className="font-bold">Our food</h2>
      <ul className="space-y-1">
        {categories.map((c) => (
          <li key={c} className="rounded border bg-white px-3 py-1 text-sm">{c}</li>
        ))}
      </ul>
      <LayoutCounter />
    </aside>
  );
}
