import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

// Reads the cart from context (Day 30) and links to /cart (Day 31).
function CartBadge() {
  const { items, total } = useCart();
  return (
    <p>
      <Link to="/cart">
        🛒 Cart: {items.length} item{items.length === 1 ? "" : "s"} · {total} ETB
      </Link>
    </p>
  );
}

export default CartBadge;
