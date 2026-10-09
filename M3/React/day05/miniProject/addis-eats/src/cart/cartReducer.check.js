// Run with:  npm run test:reducer
// Calls the reducer directly with plain objects — no React involved.
import assert from "node:assert/strict";
import { cartReducer, initialCart } from "./cartReducer.js";

const doro = { id: 1, name: "Doro wot", price: 152 };
const ambo = { id: 12, name: "Ambo", price: 40 };

// add
let state = cartReducer(initialCart, { type: "add", dish: doro });
assert.deepEqual(state.items, [doro]);
state = cartReducer(state, { type: "add", dish: ambo });
assert.deepEqual(state.items, [doro, ambo]);

// the old state object must not be mutated
const frozen = Object.freeze({ items: Object.freeze([doro]) });
assert.doesNotThrow(() => cartReducer(frozen, { type: "add", dish: ambo }));
assert.deepEqual(frozen.items, [doro]);

// remove
state = cartReducer(state, { type: "remove", id: 1 });
assert.deepEqual(state.items, [ambo]);
// removing something that is not there changes nothing
state = cartReducer(state, { type: "remove", id: 999 });
assert.deepEqual(state.items, [ambo]);

// clear
state = cartReducer(state, { type: "clear" });
assert.deepEqual(state.items, []);

// unknown action
assert.throws(() => cartReducer(initialCart, { type: "explode" }), /Unknown action/);

console.log("cartReducer: all checks passed");
