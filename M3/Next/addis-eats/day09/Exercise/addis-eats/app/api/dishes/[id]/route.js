import { getDish } from "../../../menu/dishes";
import { jsonError } from "../../../../lib/http";

// GET /api/dishes/kitfo  -> 200 dish
// GET /api/dishes/banana -> 404 { "error": "No such dish" }
export async function GET(request, { params }) {
  const { id } = await params; // a Promise in Next 15+
  const dish = await getDish(id);
  if (!dish) return jsonError("No such dish", 404);
  return Response.json(dish);
}
