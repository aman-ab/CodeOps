import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../cart/cartStore";
import { MENU_URL } from "../data/menuUrl";
import DishList from "../components/DishList";

// "/" — today's specials (the three cheapest dishes). Not split out: it is the screen people arrive on.
function Home() {
  const { data, loading, error } = useFetch(MENU_URL);
  const addItem = useCartStore((s) => s.addItem);

  const specials = [...(data?.items ?? [])].sort((a, b) => a.price - b.price).slice(0, 3);

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
