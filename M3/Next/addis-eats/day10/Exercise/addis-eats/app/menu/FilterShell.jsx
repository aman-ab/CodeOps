"use client"; // holds the selected category and handles clicks
import { useState } from "react";

// `children` is the finished, server-rendered DishList. FilterShell never imports it.
// Filtering works by hiding <li data-category="…"> items with CSS, so the server markup is untouched.
export default function FilterShell({ categories, children }) {
  const [selected, setSelected] = useState("All");
  const rule =
    selected === "All" ? "" : `#dish-list li:not([data-category="${selected}"]) { display: none; }`;

  return (
    <div>
      <div className="mb-4 flex gap-2">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={c === selected}
            onClick={() => setSelected(c)}
            className={`rounded-full border px-3 py-1 text-sm ${
              c === selected ? "bg-amber-700 text-white" : "bg-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <style>{rule}</style>
      <div id="dish-list">{children}</div>
    </div>
  );
}
