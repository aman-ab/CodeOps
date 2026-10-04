import { dishes } from "../app/data/dishes";
import { reviews } from "../app/data/reviews";
export async function getDishes() {
    // const response = await fetch("http://localhost:3000/api/dishes");
    // const data = await response.json();
    // return data;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dishes;
}
export async function getDishById(id) {
    // const response = await fetch(`http://localhost:3000/api/dishes/${id}`);
    // const data = await response.json();
    // return data;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dishes.find((dish) => dish.id === id);
}
export async function getReviewsByDishId(dishId) {
    // const response = await fetch(`http://localhost:3000/api/reviews?dishId=${dishId}`);
    // const data = await response.json();
    // return data;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return reviews.filter((review) => review.dishId === dishId);
}
