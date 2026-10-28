import { getDishes } from "../../menu/dishes";

// GET /api/dishes            -> 200, the full menu
// GET /api/dishes?category=Mains -> 200, filtered (reading request.url makes this route dynamic)
export async function GET(request) {
  const category = new URL(request.url).searchParams.get("category");
  const dishes = await getDishes();
  const result = category
    ? dishes.filter((d) => d.category.toLowerCase() === category.toLowerCase())
    : dishes;
  return Response.json(result);
}
