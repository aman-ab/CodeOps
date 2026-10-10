import { Link } from "react-router-dom";
import { selectCount, selectTotal, useCartStore } from "../cart/cartStore";

// Two narrow selectors, each returning ONE number. This badge re-renders when the
// count or the total changes — and nothing above it (Header, Layout) re-renders at all.
function CartBadge() {
  const count = useCartStore(selectCount);
  const total = useCartStore(selectTotal);
  return (
    <p>
      <Link to="/cart">
        🛒 Cart: {count} item{count === 1 ? "" : "s"} · {total} ETB
      </Link>
    </p>
  );
}

export default CartBadge;
