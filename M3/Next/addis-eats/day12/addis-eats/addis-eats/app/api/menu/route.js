import { parseMenuParams, queryMenu } from "../../../lib/menuQuery";
import { jsonError } from "../../../lib/http";

// GET /api/menu?q=tib&page=2&pageSize=4
//   200 { items, q, page, pageSize, total, totalPages }
//   422 { error, fieldErrors } for a bad page / pageSize
// (a NEW endpoint, so GET /api/dishes keeps the plain-array contract from Day 39)
export async function GET(request) {
  const parsed = parseMenuParams(new URL(request.url).searchParams);
  if (parsed.errors) return jsonError("Validation failed", 422, parsed.errors);

  await new Promise((r) => setTimeout(r, 400)); // simulated latency so keepPreviousData is visible — delete in real life
  return Response.json(await queryMenu(parsed));
}
