"use client";

import { useState } from "react";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";

export default function PaginatedDishes() {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useSWR(
    `/api/dishes?page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  if (error) {
    return <p>Could not load books.</p>;
  }

  if (isLoading && !data) {
    return <p>Loading dishes...</p>;
  }

  return (
    <section>
      <h2>Dishes</h2>

      <ul>
        {data.dishes.map((dish) => (
          <li key={dish.id}>
            {dish.name}
            {" - "}
            {dish.price} ETB
          </li>
        ))}
      </ul>

      <div>
        <button
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page === 1}
        >
          Previous
        </button>{" "}
        <span>
          Page {data.page} of {data.totalPages}
        </span>{" "}
        <button
          onClick={() =>
            setPage((current) => Math.min(data.totalPages, current + 1))
          }
          disabled={page === data.totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}
