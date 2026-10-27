"use client";

import { useState } from "react";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import DishCard from "../components/DishCard";
import DishSkeleton from "../components/DishSkeleton";
import CategoryFilter from "../components/CategoryFilter";
import SearchBox from "./SearchBox";

const PAGE_SIZE = 6;

export default function MenuBrowser({ categories }) {
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });
  if (category !== "all") params.set("category", category);
  if (term.trim()) params.set("q", term.trim());

  const { data, error, isLoading, mutate } = useSWR(`/api/dishes?${params}`, fetcher, {
    keepPreviousData: true,
  });

  // Any new search or filter starts again from page 1.
  function changeTerm(value) {
    setTerm(value);
    setPage(1);
  }

  function changeCategory(value) {
    setCategory(value);
    setPage(1);
  }

  return (
    <section aria-label="Menu">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBox value={term} onChange={changeTerm} />
        <CategoryFilter categories={categories} selected={category} onChange={changeCategory} />
      </div>

      <div className="mt-8" aria-live="polite">
        {error && !data && (
          <div className="alert alert-error flex flex-wrap items-center justify-between gap-3" role="alert">
            <span>We could not load the menu.</span>
            <button type="button" onClick={() => mutate()} className="btn btn-secondary btn-sm">
              Try again
            </button>
          </div>
        )}

        {isLoading && !data && <DishSkeleton count={PAGE_SIZE} />}

        {data && data.dishes.length === 0 && (
          <div className="card px-6 py-14 text-center">
            <p className="text-5xl" aria-hidden="true">🔍</p>
            <h2 className="mt-4 text-xl font-semibold">No dishes found</h2>
            <p className="mt-1 text-ink-500">Try a different search or category.</p>
            <button
              type="button"
              className="btn btn-secondary mt-5"
              onClick={() => {
                setTerm("");
                setCategory("all");
                setPage(1);
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {data && data.dishes.length > 0 && (
          <>
            <p className="mb-4 text-sm text-ink-500">
              {data.total} {data.total === 1 ? "dish" : "dishes"}
            </p>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>

            {data.totalPages > 1 && (
              <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-4">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={data.page === 1}
                >
                  ← Previous
                </button>

                <span className="text-sm text-ink-600">
                  Page {data.page} of {data.totalPages}
                </span>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setPage((current) => Math.min(data.totalPages, current + 1))}
                  disabled={data.page === data.totalPages}
                >
                  Next →
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
