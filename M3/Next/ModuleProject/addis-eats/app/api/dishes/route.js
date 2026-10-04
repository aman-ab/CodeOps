import {getDishes} from "../../../lib/dishes";

//get dishes end point
export async function GET(request){
   const dishes = await getDishes();

   const category = new URL(request.url).searchParams.get("category");
   if(!category){
    return new Response.json(dishes)
   }
   const filteredDishes = dishes.filter((dish)=>dish.catagory === category)
   
   
   return  Response.json(filteredDishes);
}