// Run with:  npm run test:validate   (Exercise 3's function, tested with no React)
import assert from "node:assert/strict";
import { NOTES_MAX, normalizePhone, validate } from "./validate.js";

const good = { name: "Amanuel", phone: "0911223344", area: "Bole", notes: "" };

assert.deepEqual(validate(good), {});
assert.ok(validate({ ...good, name: "   " }).name);
for (const ok of ["0911223344", "+251911223344", "0911 22 33 44"]) {
  assert.deepEqual(validate({ ...good, phone: ok }), {}, ok);
}
for (const bad of ["", "0811223344", "091122334"]) {
  assert.ok(validate({ ...good, phone: bad }).phone, bad);
}
assert.equal(normalizePhone("0911 22-33 44"), "0911223344");
assert.ok(validate({ ...good, area: "Mars" }).area);
assert.ok(validate({ ...good, notes: "x".repeat(NOTES_MAX + 1) }).notes);

console.log("validate: all checks passed");
