import { useCart } from "../hooks/useCart";

// Reads the cart straight from context — no cart prop passed to it.
function CartBadge() {
  const { items, total } = useCart();
  return (
    <p>
      🛒 Cart: {items.length} item{items.length === 1 ? "" : "s"} · {total} ETB
    </p>
  );
}

export default CartBadge;
