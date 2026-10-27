import { buildMetadata } from "../../lib/seo";
import { Suspense } from "react";
import PagedDishes from "./PagedDishes";
import { queryMenu } from "../../lib/menuQuery";
import { getDishes } from "../menu/dishes";
import { BROWSE_PAGE_SIZE } from "../../lib/paging";

// Dynamic (reads searchParams): /browse?page=3 arrives with page 3 already rendered, so a shared
// link is indexable and shows no spinner. The client component then handles later page changes.
// Pagination: each page is its OWN canonical URL (?page=2 canonical = ?page=2). Pointing every page at
// page 1 would tell crawlers pages 2+ are duplicates and their dishes would not be found through them.
export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil((await getDishes()).length / BROWSE_PAGE_SIZE));
  return buildMetadata({
    title: page === 1 ? "Browse all dishes" : `Browse all dishes, page ${page}`,
    description: `Page ${page} of ${totalPages}: every Addis Eats dish, ${BROWSE_PAGE_SIZE} at a time, with prices in birr.`,
    path: page === 1 ? "/browse" : `/browse?page=${page}`,
  });
}

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
