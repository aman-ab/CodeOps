import { useState } from "react";
import ErrorBoundary from "../shared/ErrorBoundary";

// Exercise 3 — a second boundary around the cart panel, so the two fail independently.
// Ask for each region: "what should survive if this part breaks?"

function Menu({ broken }) {
  if (broken) throw new Error("menu failed");
  return <p>🍲 The menu is showing.</p>;
}
function CartPanel({ broken }) {
  if (broken) throw new Error("cart failed");
  return <p>🛒 The cart panel is showing.</p>;
}

export default function Exercise3_TwoBoundaries() {
  const [menuBroken, setMenuBroken] = useState(false);
  const [cartBroken, setCartBroken] = useState(false);

  return (
    <div>
      <h2>Exercise 3 · two independent boundaries</h2>
      <ErrorBoundary
        name="menu"
        onReset={() => setMenuBroken(false)}
        fallback={({ reset }) => (
          <p role="alert">
            ⚠ Menu unavailable — your cart is fine. <button onClick={reset}>Try again</button>
          </p>
        )}
      >
        <Menu broken={menuBroken} />
      </ErrorBoundary>

      <ErrorBoundary
        name="cart"
        onReset={() => setCartBroken(false)}
        fallback={({ reset }) => (
          <p role="alert">
            ⚠ Cart unavailable — your items are saved. <button onClick={reset}>Try again</button>
          </p>
        )}
      >
        <CartPanel broken={cartBroken} />
      </ErrorBoundary>

      <button onClick={() => setMenuBroken(true)}>Break the menu</button>{" "}
      <button onClick={() => setCartBroken(true)}>Break the cart</button>
      <p>Break one, then the other: each shows its own fallback and the other region keeps working.</p>
    </div>
  );
}
