import { getDishes } from "@/lib/dishes";

// GET DISHES END POINT
export async function GET(request) {
  const dishes = await getDishes();

  const category = new URL(request.url).searchParams.get("category");

  const query = new URL(request.url).searchParams.get("q");

  const page = Number(new URL(request.url).searchParams.get("page")) || 1;

  let result = dishes;

  if (category) {
    result = result.filter((dish) => dish.category === category);
  }

  if (query) {
    result = result.filter((dish) =>
      dish.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  const pageSize = 2;
  const start = (page - 1) * pageSize;

  const paginatedDishes = result.slice(start, start + pageSize);

  return Response.json({
    dishes: paginatedDishes,
    total: result.length,
    page,
    totalPages: Math.ceil(result.length / pageSize),
  });
}
