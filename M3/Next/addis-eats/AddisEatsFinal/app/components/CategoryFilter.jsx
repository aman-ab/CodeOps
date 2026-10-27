"use client";

export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {categories.map((category) => {
        const active = selected === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(category)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              active
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-ink-200 bg-white text-ink-700 hover:bg-ink-50"
            }`}
          >
            {category === "all" ? "All" : category}
          </button>
        );
      })}
    </div>
  );
}
