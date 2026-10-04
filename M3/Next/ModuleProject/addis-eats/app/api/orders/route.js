import { orderSchema } from "@/lib/schema";
import { getDishById } from "@/lib/dishes";

export async function POST(request){
    const body = await request.json();

const result = orderSchema.safeParse(body);
if(!result.success){
return Response.json({errors: result.error.errors},{status: 400});

}
const dish = await getDishById(body.id);
if(!dish){
    return Response.json({errors: "not found"},{status: 404});  
}
 const totaPrice = body.price * body.quantity;
 
}