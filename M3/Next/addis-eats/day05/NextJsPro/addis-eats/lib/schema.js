import {z} from "zod";
export const orderSchema= z.object({
    name:z.string().min(2,"name must be at least 2 chrxz").max(200),
    phone:z.string(),
    dishId: z.number().positive().int(),
    quantity: z.number().positive("quantity must be positive").int()
});