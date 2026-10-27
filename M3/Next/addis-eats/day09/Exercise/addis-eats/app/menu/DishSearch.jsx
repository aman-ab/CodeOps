"use client"; // useState + SWR
import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { menuKey } from "../../lib/paging";
import { useDebounce } from "../../lib/useDebounce";

export default function DishSearch() {
  const [term, setTerm] = useState("");
  const debounced = useDebounce(term.trim(), 300); // one request per pause, not per keystroke

  const { data, error, isValidating } = useSWR(
    debounced ? menuKey({ q: debounced, pageSize: 6 }) : null, // Ex 5: null key = "not yet", nothing is fetched
    fetcher,
    { keepPreviousData: true } // Ex 6: keep the old list on screen while the next one loads
  );

  // With keepPreviousData, SWR still hands back the LAST results when the key becomes null.
  // Only show results while there is actually a search term.
  const results = debounced ? data : null;
  const typing = term.trim() !== debounced;

  return (
    <div className="mb-6 space-y-2">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search dishes… (try “tib”, “wot”, “vegan”)"
        className="w-full max-w-md rounded border bg-white p-2"
        aria-label="Search dishes"
      />

      {term.trim() && (typing || isValidating) && <p className="text-xs text-stone-500">Searching…</p>}
      {error && <p className="text-sm text-red-700">Search failed — keep typing to try again.</p>}

      {results && (
        <div className={isValidating ? "opacity-60 transition-opacity" : "transition-opacity"}>
          {results.items.length === 0 ? (
            <p className="text-sm">No dishes match “{results.q}”.</p>
          ) : (
            <ul className="space-y-1">
              {results.items.map((d) => (
                <li key={d.id}>
                  <Link className="underline" href={`/menu/${d.id}`}>{d.name}</Link>
                  <span className="text-sm text-stone-600"> — {d.category}, {d.price} birr</span>
                </li>
              ))}
            </ul>
          )}
          {results.total > results.items.length && (
            <p className="text-xs text-stone-500">Showing {results.items.length} of {results.total} matches.</p>
          )}
        </div>
      )}
    </div>
  );
}
