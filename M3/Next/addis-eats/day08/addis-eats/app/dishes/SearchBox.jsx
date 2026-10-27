"use client";

import { useState } from "react";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";

export default function SearchBox() {
  const [term, setTerm] = useState("");

  const { data, error, isLoading } = useSWR(
    term ?
     `/api/dishes?q=${encodeURIComponent(term)}`
      : null,
    fetcher,
  );

  return (
    <section>
      <h2>Search Dishes</h2>

      <input
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search Dishes..."
      />

      {!term && <p>Start typing to search.</p>}

      {isLoading && <p>Searching...</p>}

      {error && <p>Could not search dishes.</p>}

      {data && (
        <ul>
          {data.map((dish) => (
            <li key={dish.id}>
              {dish.name} - {dish.price} ETB
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
