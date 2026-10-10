import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../cart/cartStore";
import { MENU_URL } from "../data/menuUrl";
import CategoryBar from "../components/CategoryBar";
import DishList from "../components/DishList";
import CrashIf from "../dev/CrashIf";

// /menu?category=beverage — the filter lives in the URL (Day 31).
// No useMemo / useCallback / React.memo: filtering and sorting a few dishes costs nothing
// measurable, and an optimisation nobody measured is code someone has to maintain.
function Menu() {
  const [params, setParams] = useSearchParams();
  const catagory = params.get("category") ?? "All"; // your spelling, as in Day 29–33
  const { data, loading, error } = useFetch(MENU_URL);
  const addItem = useCartStore((s) => s.addItem);

  const items = data?.items ?? [];
  const filtered = catagory === "All" ? items : items.filter((d) => d.catagory === catagory);
  const shown = [...filtered].sort((a, b) => a.price - b.price);

  // dev crash test: ?crash=dish makes the first dish throw, ?crash=menu makes the whole menu throw
  const crash = params.get("crash");
  const crashId = crash === "dish" ? shown[0]?.id : undefined;

  function handleSelect(cat) {
    if (cat === "All") setParams({});
    else setParams({ category: cat });
  }

  return (
    <div className="main-c">
      <CrashIf when={crash === "menu"} label="menu" />
      <h2>Dishes</h2>
      <CategoryBar selected={catagory} onSelectCategory={handleSelect} />
      <p>Showing: {catagory}</p>

      {/* a failed fetch is NOT caught by an error boundary — that is this error state's job */}
      {loading && <p>Loading the menu…</p>}
      {error && <p>Could not load the menu: {error}</p>}
      {!loading && !error && shown.length === 0 && <p>No dishes in the category “{catagory}”.</p>}
      {!loading && !error && shown.length > 0 && (
        <DishList dishes={shown} onAdd={addItem} crashId={crashId} />
      )}
    </div>
  );
}

export default Menu;
