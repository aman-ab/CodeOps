import { z } from "zod";
import { MAX_QTY_PER_DISH } from "./pricing";

// Accepts 0911234567, 911234567, +251911234567, 251 911 234 567 ...
const ETHIOPIAN_PHONE = /^(\+251|251|0)?[79]\d{8}$/;

export const checkoutSchema = z.object({
  customer: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your full name")
      .max(100, "Name is too long"),
    phone: z
      .string()
      .trim()
      .refine(
        (value) => ETHIOPIAN_PHONE.test(value.replace(/[\s-]/g, "")),
        "Enter a valid phone number, e.g. 0911 234 567",
      ),
    address: z
      .string()
      .trim()
      .min(5, "Please enter your delivery address")
      .max(300, "Address is too long"),
    notes: z.string().trim().max(300, "Notes are too long").optional(),
  }),
  items: z
    .array(
      z.object({
        dishId: z.coerce.number().int().positive(),
        quantity: z
          .number()
          .int()
          .min(1, "Quantity must be at least 1")
          .max(MAX_QTY_PER_DISH, `You can order at most ${MAX_QTY_PER_DISH} of one dish`),
      }),
    )
    .min(1, "Your cart is empty")
    .max(30, "Too many items in one order"),
});

// Turns zod issues into a flat { "customer.name": "message" } object
// that the checkout form can show next to each field.
export function toFieldErrors(error) {
  const errors = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
