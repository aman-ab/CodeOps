import { getDishesById } from "@/lib/dishes";

export async function GET(request, { params }) {
  const { id } = await params;
  const dish = await getDishesById(id);

  if (!dish) {
    return Response.json({ message: "Dish not found" }, { status: 404 });
  }

  return Response.json(dish);
}
