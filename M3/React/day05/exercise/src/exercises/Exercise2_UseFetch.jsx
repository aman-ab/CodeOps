import { useFetch } from "../hooks/useFetch";

// Exercise 2 — the same hook used in two components.
// Open the Network tab: menu.json is requested twice, because each component
// gets its OWN data/loading/error. The hook shares logic, not data.

function DishCount() {
  const { data, loading, error } = useFetch("menu.json");
  if (loading) return <p>Counting dishes…</p>;
  if (error) return <p>Error: {error}</p>;
  return <p>There are {data.items.length} dishes on the menu.</p>;
}

function CheapestDish() {
  const { data, loading, error } = useFetch("menu.json");
  if (loading) return <p>Finding the cheapest dish…</p>;
  if (error) return <p>Error: {error}</p>;
  const cheapest = data.items.reduce((a, b) => (b.price < a.price ? b : a));
  return (
    <p>
      Cheapest: {cheapest.name} — {cheapest.price} ETB
    </p>
  );
}

export default function Exercise2_UseFetch() {
  return (
    <div>
      <h2>Exercise 2 · useFetch in two components</h2>
      <DishCount />
      <CheapestDish />
    </div>
  );
}
