import {z} from "zod";
export const orderSchema =z.object({
name: z.string().min(2, "Name must be at least 2").max(100),
phone: z.string().regex(/^(09\d{8})$/,"use 09xxxxxx format"),
id: z.string().min(1, "dish id is required"),
quantity:z.number().positive("quantity must be postive").int(),

});