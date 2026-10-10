import { validate } from "./validate.js";

// A pretend server for Exercises 6 and 7.
export const CART_TOTAL = 640; // ETB — the amount shown in the button label

export class OrderError extends Error {
  constructor(message, { status = 0, fieldErrors = {} } = {}) {
    super(message);
    this.name = "OrderError";
    this.status = status; // 0 = network, 422 = the server rejected the data
    this.fieldErrors = fieldErrors;
  }
}

// simulate: "network" -> a dropped connection. A phone ending in 0000 -> a 422.
export async function placeOrder(form, { simulate, delayMs = 1200 } = {}) {
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  if (simulate === "network") {
    throw new OrderError(
      "We couldn't reach the kitchen. Check your signal and press Order again — your details are still here.",
    );
  }

  const fieldErrors = validate(form); // the server validates too
  if (form.phone.endsWith("0000")) {
    fieldErrors.phone = "That number is not registered with TeleBirr";
  }
  if (Object.keys(fieldErrors).length > 0) {
    throw new OrderError("Some details need fixing before we can send your order.", {
      status: 422,
      fieldErrors,
    });
  }
  return { id: `AE-${Date.now().toString(36).toUpperCase()}` };
}
