"use client"; // SWR + useSearchParams
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { BROWSE_PAGE_SIZE, menuKey } from "../../lib/paging";

// A real <Link> (so it is a real, shareable URL, middle-click works) that updates the address bar
// with history.pushState instead of a full navigation. useSearchParams follows pushState in
// Next 14.1+, so the page changes with exactly ONE API request and no server re-render.
function PageLink({ page, disabled, children }) {
  if (disabled) return <span className="rounded border px-3 py-1 opacity-40">{children}</span>;
  const href = `/browse?page=${page}`;
  return (
    <Link
      href={href}
      prefetch={false}
      className="rounded border bg-white px-3 py-1"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // let "open in new tab" work
        e.preventDefault(); // Link skips its own navigation when the click is already handled
        window.history.pushState(null, "", href);
      }}
    >
      {children}
    </Link>
  );
}

export default function PagedDishes({ initialPage, initial }) {
  const searchParams = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

  const key = menuKey({ page, pageSize: BROWSE_PAGE_SIZE });
  const initialKey = menuKey({ page: initialPage, pageSize: BROWSE_PAGE_SIZE });

  const { data, error, isValidating } = useSWR(key, fetcher, {
    keepPreviousData: true, // the old page stays visible until the new one arrives: no flash
    // Only offer the server data for the key it belongs to. fallbackData for EVERY key
    // would show page 1's dishes while page 2 loads.
    fallbackData: key === initialKey ? initial : undefined,
  });

  if (!data) return error ? <p className="text-red-700">Could not load dishes.</p> : <p>Loading…</p>;

  return (
    <div className="space-y-4">
      <ul className={`space-y-2 transition-opacity ${isValidating ? "opacity-60" : ""}`}>
        {data.items.length === 0 && <li>No dishes on this page.</li>}
        {data.items.map((d) => (
          <li key={d.id} className="rounded border bg-white p-3">
            <Link className="font-semibold underline" href={`/menu/${d.id}`}>{d.name}</Link>
            <span className="text-sm text-stone-600"> — {d.category}, {d.price} birr</span>
          </li>
        ))}
      </ul>

      {error && <p className="text-sm text-red-700">Could not refresh — showing the last page we have.</p>}

      <nav className="flex items-center gap-3">
        <PageLink page={page - 1} disabled={page <= 1}>← Previous</PageLink>
        <span className="text-sm">Page {data.page} of {data.totalPages}</span>
        <PageLink page={page + 1} disabled={page >= data.totalPages}>Next →</PageLink>
      </nav>
    </div>
  );
}
