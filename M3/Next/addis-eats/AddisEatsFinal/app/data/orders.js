import { dishes } from "./dishes";
import { DELIVERY_FEE } from "../../lib/pricing";

// Sample history so the dashboard has something to show.
// Totals are calculated from the real dish prices.
function sample(id, userId, dishId, quantity, date) {
  const dish = dishes.find((d) => d.id === dishId);
  const subtotal = dish.price * quantity;

  return {
    id,
    userId,
    items: [{ dishId, name: dish.name, price: dish.price, quantity }],
    subtotal,
    deliveryFee: DELIVERY_FEE,
    total: subtotal + DELIVERY_FEE,
    status: "completed",
    date,
    createdAt: `${date}T12:00:00+03:00`,
  };
}

export const orders = [
  sample("ord_1", "user_1", 1, 2, "2026-09-01"),
  sample("ord_2", "user_2", 2, 1, "2026-09-02"),
  sample("ord_3", "user_1", 3, 3, "2026-09-02"),
  sample("ord_4", "user_2", 4, 2, "2026-09-03"),
  sample("ord_5", "user_1", 2, 2, "2026-09-04"),
];
