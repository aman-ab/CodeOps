import { CartProvider } from "../context/CartProvider";
import { useCart } from "../context/useCart";
import ErrorBoundary from "../shared/ErrorBoundary";
import { doro } from "../shared/dishes";

// Exercise 1 — wrap CartContext in a useCart hook that throws a clear error
// when the provider is missing (see context/useCart.js).

function Inside() {
  const { items, addItem } = useCart();
  return (
    <p>
      ✅ Inside a provider: {items.length} item(s) <button onClick={() => addItem(doro)}>add</button>
    </p>
  );
}

function Outside() {
  useCart(); // no <CartProvider> above this one -> throws immediately, with a message you can act on
  return <p>never shown</p>;
}

export default function Exercise1_GuardedHook() {
  return (
    <div>
      <h2>Exercise 1 · the guarded useCart hook</h2>
      <CartProvider>
        <Inside />
      </CartProvider>
      <ErrorBoundary>
        <Outside />
      </ErrorBoundary>
      <p>(React also prints the error in the console — that is normal.)</p>
    </div>
  );
}
