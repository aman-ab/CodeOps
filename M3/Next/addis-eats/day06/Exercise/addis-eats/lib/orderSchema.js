import { z } from "zod";
import { AREAS } from "./areas";

export const PHONE_RE = /^(09\d{8}|\+2519\d{8})$/;

// ONE schema, used by the route handler AND the server action (through orderService).
// Note there is no price field: the server looks prices up itself.
export const orderSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(60, "Name is too long"),
  phone: z.string().trim().regex(PHONE_RE, "Use 09… or +2519… (for example 0911223344)"),
  area: z.enum(AREAS, { message: "Choose a delivery area" }),
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        qty: z.number().int("Quantity must be a whole number").min(1, "Minimum 1").max(20, "Maximum 20"),
      })
    )
    .min(1, "Your cart is empty"),
});
