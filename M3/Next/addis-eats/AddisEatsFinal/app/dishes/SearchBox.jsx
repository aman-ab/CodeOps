"use client";

export default function SearchBox({ value, onChange }) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <label htmlFor="dish-search" className="sr-only">
        Search dishes
      </label>

      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-ink-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>

      <input
        id="dish-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search dishes…"
        autoComplete="off"
        className="input pl-11"
      />
    </div>
  );
}
