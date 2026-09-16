import { Link } from "react-router-dom";
import { useCartStore, selectItemCount } from "./cartStore";

function CartBadge() {
  // Narrow selector: this re-renders only when the item count changes.
  const itemCount = useCartStore(selectItemCount);

  return (
    <Link to="/cart" className="cart-badge" aria-label={`${itemCount} items in cart`}>
      🛒 Cart ({itemCount})
    </Link>
  );
}

export default CartBadge;
