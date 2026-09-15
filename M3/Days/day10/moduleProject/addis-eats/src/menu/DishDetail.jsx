import { Link, useParams } from "react-router-dom";
import { useMenu } from "../hooks/useMenu";
import { useCartStore } from "../cart/cartStore";

function DishDetail() {
  const { id } = useParams();
  const { menu, loading, error } = useMenu();
  const addItem = useCartStore((s) => s.addItem);

  if (loading) return <p className="page">Loading dish...</p>;
  if (error) return <p className="page">Something went wrong loading the menu.</p>;

  const dish = menu.find((item) => String(item.id) === id);

  if (!dish) {
    return (
      <div className="page">
        <p>We couldn&apos;t find that dish.</p>
        <Link to="/menu">Back to the menu</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/menu">← Back to the menu</Link>
      <div className="card dish-detail-card">
        <h2>{dish.name}</h2>
        <p>
          {dish.price} ETB · {dish.catagory}
        </p>
        {dish.isspicy && (
          <p>
            <em>spicy 🌶️</em>
          </p>
        )}
        <p>{dish.description}</p>
        <button type="button" onClick={() => addItem(dish)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default DishDetail;
