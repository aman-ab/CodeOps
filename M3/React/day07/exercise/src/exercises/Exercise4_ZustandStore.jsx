import { useCartStore } from "../stores/cartStore";
import { dishes } from "../shared/dishes";

// Exercise 4 — the cart as a Zustand store: items, addItem, remove, clear.
// No provider anywhere: the component just imports the store.
// (Each value is read with its own narrow selector.)

export default function Exercise4_ZustandStore() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const total = useCartStore((s) => s.items.reduce((sum, d) => sum + d.price, 0)); // derived in the selector

  return (
    <div>
      <h2>Exercise 4 · a Zustand cart store</h2>
      <p>
        {dishes.map((d) => (
          <button key={d.id} onClick={() => addItem(d)}>
            add {d.name}
          </button>
        ))}
      </p>
      <ul>
        {items.map((d, i) => (
          <li key={i}>
            {d.name} — {d.price} ETB <button onClick={() => remove(d.id)}>remove all</button>
          </li>
        ))}
      </ul>
      <p>
        Total: {total} ETB <button onClick={clear}>clear</button>
      </p>
    </div>
  );
}
