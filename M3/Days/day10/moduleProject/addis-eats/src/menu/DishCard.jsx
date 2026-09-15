import { memo } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../cart/cartStore";
import "../css/style.css";

function DishCard({ id, name, price, catagory, isspicy, currency = "ETB" }) {
  // Write-only selector: this card only calls addItem, so it never
  // re-renders when cart data changes elsewhere.
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>
        {price}{" "}
        {currency}
      </p>
      <p>{catagory}</p>
      {isspicy && (
        <p>
          <em>spicy 🌶️</em>
        </p>
      )}
      <div className="card-actions">
        <Link className="view-details"to={`/menu/${id}` }>View details</Link>
        <button type="button" onClick={() => addItem({ id, name, price, catagory, isspicy })}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

// The menu re-renders whenever the category filter changes; memo keeps
// every card that didn't change from re-rendering along with it.
export default memo(DishCard);
