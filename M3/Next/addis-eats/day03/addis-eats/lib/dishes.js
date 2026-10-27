import { dishes} from "../app/data/dishes";
import { reviews } from "@/app/data/review";
export async function getDishes(){
   // const response = await fetch("hhtp://api.example.com/dish");
   // const data = await response.json();
   // return data;

   //simulate delay to mimic fetching from an API
   await new Promise((resolve)=>setTimeout(resolve,2000));
   return dishes;
}

export async function getDishesById(id) {
    
    await new Promise((resolve)=>setTimeout(resolve,2000));
    return dishes.find((dish)=>dish.id===id);
    
}

export async function getReviewsByDishId(id) {
    await new Promise((resolve)=>setTimeout(resolve,2000));
    return reviews.filter((review) => review.dishId === id);
}   