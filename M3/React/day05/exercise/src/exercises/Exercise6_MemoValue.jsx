import { memo, useReducer, useState } from "react";
import { CartContext } from "../cart/CartContext";
import { CartProvider } from "../cart/CartProvider";
import { cartReducer, initialCart } from "../cart/cartReducer";
import { useCart } from "../hooks/useCart";

// Exercise 6 — see what the memoised provider value prevents.
// Open the browser console, then press "Re-render parent".
// (In dev, StrictMode renders twice, so count the *difference* between the two.)

// Same as CartProvider, but the value is NOT memoised.
function LeakyCartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart);
  const total = state.items.reduce((sum, d) => sum + d.price, 0);
  return (
    <CartContext.Provider value={{ items: state.items, dispatch, total }}>
      {children}
    </CartContext.Provider>
  );
}

// memo: it only re-renders if its props OR the context value change.
const TotalLabel = memo(function TotalLabel({ name }) {
  const { total } = useCart();
  console.log(`TotalLabel rendered → ${name}`);
  return (
    <p>
      {name}: {total} ETB
    </p>
  );
});

export default function Exercise6_MemoValue() {
  const [tick, setTick] = useState(0); // unrelated state that re-renders the providers

  return (
    <div>
      <h2>Exercise 6 · memoised provider value</h2>
      <button onClick={() => setTick(tick + 1)}>Re-render parent ({tick})</button>

      <CartProvider>
        <TotalLabel name="memoised provider" />
      </CartProvider>

      <LeakyCartProvider>
        <TotalLabel name="leaky provider" />
      </LeakyCartProvider>

      <p>Expected: only the “leaky provider” line is logged after each click.</p>
    </div>
  );
}
