// One place for money rules, shared by the cart (browser) and the API (server).
export const DELIVERY_FEE = 50; // ETB, flat
export const MAX_QTY_PER_DISH = 20;

export function calcTotals(lines) {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const deliveryFee = lines.length > 0 ? DELIVERY_FEE : 0;
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}
