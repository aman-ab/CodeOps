// Run with:  npm run test:slice   (needs `npm install` first)
// A slice's reducer is a plain function, so it can be tested without a store or React.
import assert from "node:assert/strict";
import reducer, { addItem, clear, remove } from "./cartSlice.js";

const doro = { id: 1, name: "Doro wot", price: 152 };
const ambo = { id: 12, name: "Ambo", price: 40 };

let state = reducer(undefined, { type: "@@init" });
assert.deepEqual(state, { items: [] });

const before = reducer(state, addItem(doro));
const after = reducer(before, addItem(ambo));
assert.deepEqual(after.items, [doro, ambo]);
// push "mutated" a draft, not the old state: the old state is untouched
assert.deepEqual(before.items, [doro]);
assert.notEqual(before, after);

state = reducer(after, remove(1));
assert.deepEqual(state.items, [ambo]);

state = reducer(state, clear());
assert.deepEqual(state.items, []);

console.log("cartSlice: all checks passed");
