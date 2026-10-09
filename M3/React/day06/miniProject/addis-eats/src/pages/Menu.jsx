import { useCallback, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useAddToCart } from "../hooks/useAddToCart";
import { MENU_URL } from "../data/menuUrl";
import CategoryBar from "../components/CategoryBar";
import DishList from "../components/DishList";

// /menu?category=beverage — the filter lives in the URL, so it can be shared,
// bookmarked, and survives a refresh. The cart does NOT: it stays in context.
function Menu() {
  const [params, setParams] = useSearchParams();
  const catagory = params.get("category") ?? "All"; // your spelling, as in Day 29/30

  const location = useLocation();
  const orderedBy = location.state?.orderPlaced; // set by Checkout after an order

  const { data, loading, error } = useFetch(MENU_URL);
  const addToCart = useAddToCart();

  const shown = useMemo(() => {
    const items = data?.items ?? [];
    const filtered =
      catagory === "All" ? items : items.filter((d) => d.catagory === catagory);
    return [...filtered].sort((a, b) => a.price - b.price);
  }, [data, catagory]);

  const handleSelect = useCallback(
    (cat) => {
      if (cat === "All") setParams({}); // "All" is the default: keep the url clean
      else setParams({ category: cat });
    },
    [setParams],
  );

  return (
    <div className="main-c">
      {orderedBy && <p>✅ Order placed — thank you, {orderedBy}!</p>}
      <h2>Dishes</h2>
      <CategoryBar selected={catagory} onSelectCategory={handleSelect} />
      <p>Showing: {catagory}</p>

      {loading && <p>Loading the menu…</p>}
      {error && <p>Could not load the menu: {error}</p>}
      {!loading && !error && shown.length === 0 && (
        <p>No dishes in the category “{catagory}”.</p>
      )}
      {!loading && !error && shown.length > 0 && (
        <DishList dishes={shown} onAdd={addToCart} />
      )}
    </div>
  );
}

export default Menu;
