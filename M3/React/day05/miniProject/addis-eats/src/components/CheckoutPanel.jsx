import { useCart } from "../hooks/useCart";
import OrderForm from "./OrderForm";

// Second consumer of the cart (the first is CartBadge). Neither of them
// receives any cart prop — both read it from context.
function CheckoutPanel() {
  const { items, total, dispatch } = useCart();

  // group repeated dishes so "Doro wot ×3" shows once
  const lines = [];
  for (const dish of items) {
    const line = lines.find((l) => l.dish.id === dish.id);
    if (line) line.qty += 1;
    else lines.push({ dish, qty: 1 });
  }

  return (
    <div>
      <h1>Checkout</h1>
      {lines.length === 0 && <p>Your cart is empty.</p>}

      {lines.map(({ dish, qty }) => (
        <p key={dish.id}>
          {dish.name} × {qty} — {dish.price * qty} ETB{" "}
          <button onClick={() => dispatch({ type: "remove", id: dish.id })}>
            Remove
          </button>
        </p>
      ))}

      <p>Total: {total} ETB</p>
      {lines.length > 0 && (
        <button onClick={() => dispatch({ type: "clear" })}>Clear cart</button>
      )}

      <h1>Customer Information </h1>
      {/* After a valid order the cart is emptied through the reducer. */}
      <OrderForm onSubmitted={() => dispatch({ type: "clear" })} />
    </div>
  );
}

export default CheckoutPanel;
