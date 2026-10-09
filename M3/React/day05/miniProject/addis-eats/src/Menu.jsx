import { useCallback, useMemo, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useCart } from "./hooks/useCart";
import CategoryBar from "./components/CategoryBar";
import DishList from "./components/DishList";

// Days 26–30 in one component:
//   components + props (26/27) · state (28) · fetching (29) · context/memo/custom hook (30)
function Menu() {
  const [catagory, setCatagory] = useState("All"); // day 28 (your spelling)
  const { dispatch } = useCart(); // day 30: context

  // day 29/30: the category is part of the url, so changing it re-runs the
  // effect, aborts the previous request and shows "loading" again.
  // menu.json is a static file, so the server ignores "?c=" and returns the
  // whole menu — the filtering itself happens in useMemo below.
  const { data, loading, error } = useFetch(
    `menu.json?c=${encodeURIComponent(catagory)}`,
  );

  // day 30: useMemo — filter + sort only when the data or category changes,
  // and hand DishList the *same array* between unrelated re-renders.
  const shown = useMemo(() => {
    const items = data?.items ?? [];
    const filtered =
      catagory === "All" ? items : items.filter((d) => d.catagory === catagory);
    return [...filtered].sort((a, b) => a.price - b.price); // copy: never sort state
  }, [data, catagory]);

  // day 30: useCallback — a stable onAdd so React.memo on DishList can skip renders.
  const handleAdd = useCallback(
    (dish) => dispatch({ type: "add", dish }),
    [dispatch],
  );

  return (
    <div className="main-c">
      <h2>Dishes</h2>
      <CategoryBar onSelectCategory={setCatagory} />
      <p>Showing: {catagory}</p>

      {loading && <p>Loading the menu…</p>}
      {error && <p>Could not load the menu: {error}</p>}
      {!loading && !error && <DishList dishes={shown} onAdd={handleAdd} />}
    </div>
  );
}

export default Menu;
