import { dishes } from "../app/data/dishes";
import { reviews } from "../app/data/review";

// These are async so you can swap them for a real database/API later
// without touching any page that calls them.

export async function getDishes() {
  return dishes;
}

export async function getDishesById(id) {
  return dishes.find((dish) => String(dish.id) === String(id)) ?? null;
}

export async function getReviewsByDishId(id) {
  return reviews.filter((review) => String(review.dishId) === String(id));
}
