"use client"; // needs useState for the counter — a layout itself stays a server component
import { useState } from "react";

export default function CategorySidebar() {
  const [count, setCount] = useState(0);
  const categories = ["All", "Mains", "Vegan", "Breakfast"];

  return (
    <aside className="w-44 shrink-0 space-y-3">
      <h2 className="font-bold">Categories</h2>
      <ul className="space-y-1">
        {categories.map((c) => (
          <li key={c} className="rounded border bg-white px-3 py-1 text-sm">{c}</li>
        ))}
      </ul>
      {/* Ex 3: click a few times, then open a dish — the count must survive */}
      <button className="rounded bg-amber-700 px-3 py-1 text-sm text-white" onClick={() => setCount(count + 1)}>
        Counter: {count}
      </button>
    </aside>
  );
}
