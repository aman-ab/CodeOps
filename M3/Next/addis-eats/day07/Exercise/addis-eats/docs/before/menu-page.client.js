"use client";
import Link from "next/link";
import { useState } from "react";
import { useFetch } from "./useFetch";
import { getDishes } from "./dishes";

// BEFORE: the whole menu is a client component. Everything it imports ships to the browser.
export default function MenuPage() {
  const { data: dishes, loading, error } = useFetch(getDishes);
  const [selected, setSelected] = useState("All");

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;

  const categories = ["All", ...new Set(dishes.map((d) => d.category))];
  const shown = selected === "All" ? dishes : dishes.filter((d) => d.category === selected);

  return (
    <main>
      <h1 className="mb-4 text-2xl font-bold">Menu</h1>
      <div className="mb-4 flex gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setSelected(c)} className="rounded-full border bg-white px-3 py-1 text-sm">{c}</button>
        ))}
      </div>
      <ul className="space-y-2">
        {shown.map((d) => (
          <li key={d.id}><Link className="underline" href={`/menu/${d.id}`}>{d.name}</Link> — {d.price} birr</li>
        ))}
      </ul>
    </main>
  );
}
