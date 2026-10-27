import { getDishes } from "@/lib/dishes";

const DEFAULT_PAGE_SIZE = 6;
const MAX_PAGE_SIZE = 24;

// GET /api/dishes?category=Main Dish&q=tibs&page=1&pageSize=6
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();
  const requestedPage = Math.max(1, Math.floor(Number(searchParams.get("page"))) || 1);
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, Math.floor(Number(searchParams.get("pageSize"))) || DEFAULT_PAGE_SIZE),
  );

  let result = await getDishes();

  if (category && category !== "all") {
    result = result.filter((dish) => dish.category === category);
  }

  if (query) {
    result = result.filter(
      (dish) =>
        dish.name.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query),
    );
  }

  const totalPages = Math.max(1, Math.ceil(result.length / pageSize));
  const page = Math.min(requestedPage, totalPages);
  const start = (page - 1) * pageSize;

  return Response.json({
    dishes: result.slice(start, start + pageSize),
    total: result.length,
    page,
    totalPages,
  });
}
