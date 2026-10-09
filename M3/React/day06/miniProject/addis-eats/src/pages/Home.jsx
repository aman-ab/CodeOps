import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useAddToCart } from "../hooks/useAddToCart";
import { MENU_URL } from "../data/menuUrl";
import DishList from "../components/DishList";

// "/" — the index route inside Layout: today's specials.
function Home() {
  const { data, loading, error } = useFetch(MENU_URL);
  const addToCart = useAddToCart();

  // three cheapest dishes; memoised so DishList (React.memo) gets a stable array
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
      {!loading && !error && <DishList dishes={specials} onAdd={addToCart} />}
      <p>
        <Link to="/menu">See the full menu →</Link>
      </p>
    </div>
  );
}

export default Home;
