import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../cart/cartStore";
import { MENU_URL } from "../data/menuUrl";
import DishList from "../components/DishList";

// "/" — today's specials.
function Home() {
  const { data, loading, error } = useFetch(MENU_URL);
  // An action is a stable function: this component only WRITES to the cart,
  // so it never re-renders when the cart changes.
  const addItem = useCartStore((s) => s.addItem);

  const specials = useMemo(
    () => [...(data?.items ?? [])].sort((a, b) => a.price - b.price).slice(0, 3),
    [data],
  );

  return (
    <div className="main-c">
      <h2>Welcome to Addis-Eats</h2>
      <h3>Today&apos;s specials</h3>
      {loading && <p>Loading the specials…</p>}
      {error && <p>Could not load the specials: {error}</p>}
      {!loading && !error && <DishList dishes={specials} onAdd={addItem} />}
      <p>
        <Link to="/menu">See the full menu →</Link>
      </p>
    </div>
  );
}

export default Home;
