import Link from "next/link";
import { pageWindow } from "../lib/tableQuery";

// Every page is a real <Link> to a real URL: back button, middle-click, copy-link and crawlers all work.
// hrefFor(page) is a function the (server) page passes in.
export default function Pager({ page, pages, hrefFor, label = "Pagination" }) {
  if (pages <= 1) return null;
  const box = "rounded border px-3 py-1 text-sm";
  return (
    <nav aria-label={label} className="flex flex-wrap items-center gap-2">
      {page > 1 ? (
        <Link rel="prev" href={hrefFor(page - 1)} className={`${box} bg-white`}>← Previous</Link>
      ) : (
        <span aria-disabled="true" className={`${box} opacity-40`}>← Previous</span>
      )}

      {pageWindow(page, pages).map((n, i) =>
        n === "…" ? (
          <span key={`gap-${i}`} aria-hidden="true">…</span>
        ) : n === page ? (
          <span key={n} aria-current="page" className={`${box} border-amber-700 bg-amber-700 text-white`}>{n}</span>
        ) : (
          <Link key={n} href={hrefFor(n)} aria-label={`Page ${n}`} className={`${box} bg-white`}>{n}</Link>
        )
      )}

      {page < pages ? (
        <Link rel="next" href={hrefFor(page + 1)} className={`${box} bg-white`}>Next →</Link>
      ) : (
        <span aria-disabled="true" className={`${box} opacity-40`}>Next →</span>
      )}
    </nav>
  );
}
