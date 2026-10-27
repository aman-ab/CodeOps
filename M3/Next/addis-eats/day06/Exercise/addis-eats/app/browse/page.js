import { Suspense } from "react";
import PagedDishes from "./PagedDishes";
import { queryMenu } from "../../lib/menuQuery";
import { BROWSE_PAGE_SIZE } from "../../lib/paging";

// Dynamic (reads searchParams): /browse?page=3 arrives with page 3 already rendered, so a shared
// link is indexable and shows no spinner. The client component then handles later page changes.
export default async function BrowsePage({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const initial = await queryMenu({ q: "", page, pageSize: BROWSE_PAGE_SIZE }); // direct call, no HTTP hop

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Browse all dishes</h1>
      <Suspense fallback={<p>Loading…</p>}>
        <PagedDishes initialPage={page} initial={initial} />
      </Suspense>
    </main>
  );
}
