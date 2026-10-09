import { CartProvider } from "../cart/CartProvider";
import { useCart } from "../hooks/useCart";

const sample = [
  { id: 1, name: "Doro wot", price: 152 },
  { id: 12, name: "Ambo", price: 40 },
];

function CartDemo() {
  const { items, total, dispatch } = useCart();
  return (
    <div>
      {sample.map((dish) => (
        <button key={dish.id} onClick={() => dispatch({ type: "add", dish })}>
          Add {dish.name}
        </button>
      ))}
      <button onClick={() => dispatch({ type: "clear" })}>Clear</button>
      <p>Items: {items.map((d) => d.name).join(", ") || "none"}</p>
      <p>Total: {total} ETB</p>
    </div>
  );
}

// Exercise 5 — CartProvider (reducer + context) used by a consumer with no props.
export default function Exercise5_CartProvider() {
  return (
    <CartProvider>
      <h2>Exercise 5 · CartProvider</h2>
      <CartDemo />
    </CartProvider>
  );
}
