import { Link, useSearchParams } from "react-router-dom";
import { selectItems, selectTotal, useCartStore } from "../cart/cartStore";
import { groupItems } from "../cart/groupItems";
import CrashIf from "../dev/CrashIf";

// The order, beside the menu. It has its own error boundary (MenuPage), so if the
// menu breaks this keeps working — and the other way round.
function CartPanel() {
  const items = useCartStore(selectItems);
  const total = useCartStore(selectTotal);
  const remove = useCartStore((s) => s.remove);
  const [params] = useSearchParams();
  const lines = groupItems(items);

  return (
    <div className="main-c">
      <CrashIf when={params.get("crash") === "cart"} label="cart" />
      <h2>Your order</h2>
      {lines.length === 0 && <p>Nothing yet — add a dish above.</p>}
      {lines.map(({ dish, qty }) => (
        <p key={dish.id}>
          {dish.name} × {qty} — {dish.price * qty} ETB{" "}
          <button onClick={() => remove(dish.id)}>Remove</button>
        </p>
      ))}
      <p>Total: {total} ETB</p>
      {lines.length > 0 && <Link to="/checkout">Checkout →</Link>}
    </div>
  );
}

export default CartPanel;
