// The rules, in one place. A PURE function: the form in, an errors object out.
// No React, no DOM, no side effects — so it is derived on every render, can never
// disagree with the values, and can be tested on its own (checkout.check.js).
// {} means valid.

export const AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];
export const NOTES_MAX = 200;

// 0911223344 or +251911223344: a TeleBirr / Ethio Telecom mobile number
export const TELEBIRR = /^(?:\+251|0)9\d{8}$/;

// "0911 22 33 44" and "0911-223-344" are fine: fix the formatting for the person
// instead of rejecting them for it.
export const normalizePhone = (phone) => phone.replace(/[\s-]/g, "");

export function validate(form) {
  const errors = {};

  // rule 1 — the kitchen and the rider need a name to call out
  if (!form.name.trim()) errors.name = "We need a name for the delivery";

  // rule 2 — a payment/contact number the rider can reach
  if (!TELEBIRR.test(normalizePhone(form.phone))) {
    errors.phone = "Use 09… or +2519… (a TeleBirr number)";
  }

  // rule 3 — we only deliver to these areas, so the value must be one of them
  if (!AREAS.includes(form.area)) errors.area = "Choose a delivery area";

  // rule 4 — notes are optional, but not unlimited
  if (form.notes.length > NOTES_MAX) {
    errors.notes = `Keep notes to ${NOTES_MAX} characters (you have ${form.notes.length})`;
  }

  return errors;
}
