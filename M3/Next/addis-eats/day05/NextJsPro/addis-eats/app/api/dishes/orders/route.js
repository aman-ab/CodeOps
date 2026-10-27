import {orderSchema} from "@/lib/schema";
import { getDishesById } from "@/lib/dishes";

export async function POST(request) { 

    const body = await request.json();
   const result = orderSchema.safeParse(body);
   if (!result.success) {
       return Response.json({ error: result.error }, { status: 400 });
   }

 
   const dish = await getDishesById(body.dishId);
   if (!dish) {
       return Response.json ({ error: "Dish not found" }, { status: 404 });
   }  
   const totalPrice = dish.price * body.quantity;

   const order = {
       id: `Order${Date.now()}`,
       name: body.name,
       phone: body.phone,
       dishId: body.dishId,
       quantity: body.quantity,
       totalPrice: totalPrice
   };

   return Response.json({message:"order created",order }, { status: 201 });
}