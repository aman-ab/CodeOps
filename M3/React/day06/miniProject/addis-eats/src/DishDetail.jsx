import { Link, useParams } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { useAddToCart } from "./hooks/useAddToCart";
import { MENU_URL } from "./data/menuUrl";
import NotFound from "./pages/NotFound";

// /menu/:id — one component serves every dish.
function DishDetail() {
  const { id } = useParams(); // always a STRING, even for /menu/12
  const { data, loading, error } = useFetch(MENU_URL);
  const addToCart = useAddToCart();

  // loading -> error -> empty -> data (the Day 29 order, plus one more "empty")
  if (loading) return <p>Loading the dish…</p>;
  if (error) return <p>Could not load the dish: {error}</p>;

  // compare as strings: the url gives "12", the data holds 12
  const dish = data.items.find((d) => String(d.id) === id);
  // a VALID path with an id that doesn't exist still matches this route,
  // so this component must say so itself (the "*" route can't catch it)
  if (!dish) return <NotFound message={`No dish called ${id}`} />;

  return (
    <div className="main-c">
      <div className="card">
        <h2>{dish.name}</h2>
        <p>{dish.description}</p>
        <p>{dish.price} ETB</p>
        <p>{dish.catagory}</p>
        <p>{dish.isspicy && <em> spicy🌶️ </em>}</p>
        <button onClick={() => addToCart(dish)}>ADD TO CART</button>
      </div>
      <p>
        <Link to="/menu">← Back to the menu</Link>
      </p>
    </div>
  );
}

export default DishDetail;
