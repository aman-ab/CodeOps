import { usePersistedCartStore } from "../stores/persistedCartStore";
import { ambo, doro } from "../shared/dishes";

// Exercise 6 — the persist middleware. Add dishes, then REFRESH the page:
// the order is still here. Look under DevTools -> Application -> Local Storage -> "d32-ex6-cart".

export default function Exercise6_Persist() {
  const items = usePersistedCartStore((s) => s.items);
  const addItem = usePersistedCartStore((s) => s.addItem);
  const clear = usePersistedCartStore((s) => s.clear);

  return (
    <div>
      <h2>Exercise 6 · persist middleware</h2>
      <button onClick={() => addItem(doro)}>add Doro wot</button>
      <button onClick={() => addItem(ambo)}>add Ambo</button>
      <button onClick={clear}>clear</button>
      <button onClick={() => usePersistedCartStore.persist.clearStorage()}>
        delete the saved copy only
      </button>
      <p>In the cart: {items.map((d) => d.name).join(", ") || "nothing"}</p>
    </div>
  );
}
