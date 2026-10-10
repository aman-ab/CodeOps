// Run with:  npm run test:store
// The store is a plain module, so it can be tested with no React and no components.
import assert from "node:assert/strict";

// Node has no localStorage, so give the persist middleware a tiny in-memory one.
// (It must exist BEFORE the store module is imported.)
const memory = new Map();
Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  writable: true,
  value: {
    getItem: (k) => (memory.has(k) ? memory.get(k) : null),
    setItem: (k, v) => memory.set(k, String(v)),
    removeItem: (k) => memory.delete(k),
  },
});

const { useCartStore, selectCount, selectTotal } = await import("./cartStore.js");

const doro = { id: 1, name: "Doro wot", price: 152 };
const ambo = { id: 12, name: "Ambo", price: 40 };
const saved = () => JSON.parse(memory.get("addis-eats-cart")).state.items;

// starts empty
assert.deepEqual(useCartStore.getState().items, []);

// addItem
useCartStore.getState().addItem(doro);
useCartStore.getState().addItem(ambo);
useCartStore.getState().addItem(doro);
assert.equal(selectCount(useCartStore.getState()), 3);
assert.equal(selectTotal(useCartStore.getState()), 152 + 40 + 152);

// persistence: every change is written to localStorage
assert.equal(saved().length, 3);

// remove deletes every copy of that dish
useCartStore.getState().remove(1);
assert.deepEqual(useCartStore.getState().items, [ambo]);
assert.deepEqual(saved(), [ambo]);

// actions are stable references — why a memo'd DishList can use them directly
const before = useCartStore.getState().addItem;
useCartStore.getState().addItem(ambo);
assert.equal(useCartStore.getState().addItem, before);

// clear
useCartStore.getState().clear();
assert.deepEqual(useCartStore.getState().items, []);
assert.deepEqual(saved(), []);

console.log("cartStore: all checks passed");
