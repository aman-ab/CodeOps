import { validate } from "../checkout/validate.js";

// A pretend server. "Orders" are kept in localStorage so the receipt page survives a refresh.
// The real thing arrives in Module 4.
const KEY = "addis-eats-orders";

export class OrderError extends Error {
  constructor(message, { status = 0, fieldErrors = {} } = {}) {
    super(message);
    this.name = "OrderError";
    this.status = status; // 0 = could not reach the server, 422 = rejected the data
    this.fieldErrors = fieldErrors;
  }
}

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
}

export function getOrder(id) {
  return readAll()[id] ?? null;
}

// order = { form: { name, phone, area, notes }, items, total }
// options.simulate = "network" -> behave like a dropped connection
export async function placeOrder(order, { simulate, delayMs = 900 } = {}) {
  await new Promise((resolve) => setTimeout(resolve, delayMs)); // a weak mobile signal

  if (simulate === "network") {
    throw new OrderError(
      "We couldn't reach the kitchen. Check your signal and press Order again — your details are still here.",
      { status: 0 },
    );
  }

  // The server validates TOO: anything sent from a browser can be forged.
  const fieldErrors = validate(order.form);
  if (order.form.phone.endsWith("0000")) {
    fieldErrors.phone = "That number is not registered with TeleBirr"; // only a server can know this
  }
  if (Object.keys(fieldErrors).length > 0) {
    throw new OrderError("Some details need fixing before we can send your order.", {
      status: 422,
      fieldErrors,
    });
  }

  const saved = {
    id: `AE-${Date.now().toString(36).toUpperCase()}`,
    placedAt: new Date().toISOString(),
    ...order,
  };
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...readAll(), [saved.id]: saved }));
  } catch {
    // storage unavailable: the order still "succeeded" for this visit
  }
  return saved;
}
