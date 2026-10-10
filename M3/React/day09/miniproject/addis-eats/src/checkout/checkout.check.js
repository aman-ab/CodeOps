// Run with:  npm run test:checkout
// validate() and the pretend server are plain functions: no React, no browser needed.
import assert from "node:assert/strict";

// a tiny in-memory localStorage for the pretend server (set BEFORE importing it)
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

const { validate, normalizePhone, NOTES_MAX } = await import("./validate.js");
const { placeOrder, getOrder, OrderError } = await import("../api/orders.js");

const good = { name: "Amanuel", phone: "0911223344", area: "Bole", notes: "" };

// ---- validate ----
assert.deepEqual(validate(good), {}); // {} means valid

assert.ok(validate({ ...good, name: "" }).name);
assert.ok(validate({ ...good, name: "   " }).name); // spaces only is still empty

for (const ok of ["0911223344", "+251911223344", "0911 22 33 44", "0911-223-344", " 0911223344 "]) {
  assert.deepEqual(validate({ ...good, phone: ok }), {}, `should accept ${ok}`);
}
for (const bad of ["", "0811223344", "091122334", "09112233445", "+2519112233", "abcdefghij"]) {
  assert.ok(validate({ ...good, phone: bad }).phone, `should reject "${bad}"`);
}
assert.equal(normalizePhone("0911 22-33 44"), "0911223344");

assert.ok(validate({ ...good, area: "Mars" }).area);
assert.deepEqual(validate({ ...good, area: "Piassa" }), {});

assert.deepEqual(validate({ ...good, notes: "x".repeat(NOTES_MAX) }), {}); // exactly 200 is fine
assert.ok(validate({ ...good, notes: "x".repeat(NOTES_MAX + 1) }).notes);

// several problems at once, and the input is never mutated
const frozen = Object.freeze({ name: "", phone: "1", area: "Mars", notes: "" });
assert.deepEqual(Object.keys(validate(frozen)), ["name", "phone", "area"]);

// ---- the pretend server ----
const order = { form: good, items: [{ id: 1, name: "Doro wot", price: 152 }], total: 152 };

// success: saved, and the receipt can find it
const saved = await placeOrder(order, { delayMs: 0 });
assert.match(saved.id, /^AE-/);
assert.deepEqual(getOrder(saved.id).form, good);
assert.equal(getOrder("nope"), null);

// 422: the server validates too, and knows things the client can't
await assert.rejects(
  () => placeOrder({ ...order, form: { ...good, phone: "0911000000" } }, { delayMs: 0 }),
  (err) => err instanceof OrderError && err.status === 422 && Boolean(err.fieldErrors.phone),
);
await assert.rejects(
  () => placeOrder({ ...order, form: { ...good, name: "" } }, { delayMs: 0 }),
  (err) => err.status === 422 && Boolean(err.fieldErrors.name),
);

// network failure
await assert.rejects(
  () => placeOrder(order, { delayMs: 0, simulate: "network" }),
  (err) => err instanceof OrderError && err.status === 0,
);

console.log("checkout: all checks passed");
