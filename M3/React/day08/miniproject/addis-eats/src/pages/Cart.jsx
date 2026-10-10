import { Link } from "react-router-dom";
import { selectItems, selectTotal, useCartStore } from "../cart/cartStore";
import { groupItems } from "../cart/groupItems";

// /cart — before: const { items, total, dispatch } = useCart();
//         after:  one narrow selector per value.
function Cart() {
  const items = useCartStore(selectItems);
  const total = useCartStore(selectTotal);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
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
          <button onClick={() => remove(dish.id)}>Remove</button>
        </p>
      ))}

      <p>Total: {total} ETB</p>
      {lines.length > 0 && (
        <p>
          <button onClick={clear}>Clear cart</button>{" "}
          <Link to="/checkout">Proceed to checkout →</Link>
        </p>
      )}
    </div>
  );
}

export default Cart;
