import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { groupItems } from "../cart/groupItems";

// /cart — the order so far. It is still here after browsing because
// CartProvider sits ABOVE the router and never unmounts.
function Cart() {
  const { items, total, dispatch } = useCart();
  const lines = groupItems(items);

  return (
    <div className="main-c">
      <h2>Your cart</h2>
      {lines.length === 0 && (
        <p>
          Your cart is empty. <Link to="/menu">Browse the menu</Link>
        </p>
      )}

      {lines.map(({ dish, qty }) => (
        <p key={dish.id}>
          <Link to={`/menu/${dish.id}`}>{dish.name}</Link> × {qty} — {dish.price * qty} ETB{" "}
          <button onClick={() => dispatch({ type: "remove", id: dish.id })}>Remove</button>
        </p>
      ))}

      <p>Total: {total} ETB</p>
      {lines.length > 0 && (
        <p>
          <button onClick={() => dispatch({ type: "clear" })}>Clear cart</button>{" "}
          <Link to="/checkout">Proceed to checkout →</Link>
        </p>
      )}
    </div>
  );
}

export default Cart;
