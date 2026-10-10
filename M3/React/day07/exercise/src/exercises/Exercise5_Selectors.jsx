import { create } from "zustand";

// Exercise 5 — replace each useCart() call with a narrow selector, one component at a time.
//
//   before:  const { items, dispatch } = useCart();   dispatch({ type: "add", dish });
//   after:   const items   = useCartStore((s) => s.items);
//            const addItem = useCartStore((s) => s.addItem);   addItem(dish);
//
// This demo shows WHY it matters. The store has two unrelated values; typing in the
// note box changes `note`. Watch the console while you type.

const useDraftStore = create((set) => ({
  items: [],
  note: "",
  addItem: (dish) => set((s) => ({ items: [...s.items, dish] })),
  setNote: (note) => set({ note }),
}));

function NoteBox() {
  const note = useDraftStore((s) => s.note);
  const setNote = useDraftStore((s) => s.setNote);
  return <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="type a note…" />;
}

function BadgeNarrow() {
  const count = useDraftStore((s) => s.items.length); // one value: re-renders only when it changes
  console.log("BadgeNarrow render");
  return <p>✅ narrow selector — items: {count}</p>;
}

function BadgeWhole() {
  const store = useDraftStore(); // AVOID: the whole store, re-renders on ANY change
  console.log("BadgeWhole render (avoid this)");
  return <p>⚠️ whole store — items: {store.items.length}</p>;
}

function AddButton() {
  const addItem = useDraftStore((s) => s.addItem); // only writes: an action never changes
  console.log("AddButton render"); // logs once on mount, then never again
  return <button onClick={() => addItem({ id: Date.now(), name: "dish", price: 1 })}>add a dish</button>;
}

export default function Exercise5_Selectors() {
  return (
    <div>
      <h2>Exercise 5 · narrow selectors</h2>
      <NoteBox />
      <AddButton />
      <BadgeNarrow />
      <BadgeWhole />
      <p>Type in the box: only “BadgeWhole” logs. Click “add a dish”: both badges log, the button never does.</p>
    </div>
  );
}
