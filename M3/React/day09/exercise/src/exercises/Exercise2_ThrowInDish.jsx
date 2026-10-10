import { useState } from "react";
import ErrorBoundary from "../shared/ErrorBoundary";
import { dishes } from "../shared/dishes";

// Exercise 2 — throw deliberately inside ONE dish and confirm the header and cart still work.
// The header counter and the cart live OUTSIDE the boundary; press them after breaking a dish.

function Dish({ dish, explode }) {
  if (explode) throw new Error(`Dish "${dish.name}" threw while rendering`);
  return (
    <li>
      {dish.name} — {dish.price} ETB
    </li>
  );
}

export default function Exercise2_ThrowInDish() {
  const [headerClicks, setHeaderClicks] = useState(0);
  const [cart, setCart] = useState(0);
  const [explodeId, setExplodeId] = useState(null);

  return (
    <div>
      <h2>Exercise 2 · throw inside one dish</h2>
      <p>
        <strong>Header</strong> <button onClick={() => setHeaderClicks(headerClicks + 1)}>clicks: {headerClicks}</button>
      </p>

      <ErrorBoundary
        name="menu"
        resetKeys={[explodeId]}
        fallback={<p role="alert">⚠ The menu is unavailable. The header and the cart still work.</p>}
      >
        <ul>
          {dishes.map((d) => (
            <Dish key={d.id} dish={d} explode={d.id === explodeId} />
          ))}
        </ul>
      </ErrorBoundary>
      <p>
        {dishes.map((d) => (
          <button key={d.id} onClick={() => setExplodeId(d.id)}>
            Break {d.name}
          </button>
        ))}{" "}
        <button onClick={() => setExplodeId(null)}>Repair</button>
      </p>

      <p>
        <strong>Cart</strong> <button onClick={() => setCart(cart + 1)}>add a dish ({cart})</button>
      </p>
      <p>Break a dish, then use the header and cart buttons: their counters are not lost.</p>
    </div>
  );
}
