import { Suspense } from "react";
import DishList from "./DishList";
import DishSkeleton from "./DishSkeleton";

// ISR: built once, then re-made at most hourly. One hour is fine for a menu
// that changes a few times a day — a price during a promotion would NOT be.
// Must be a literal number, and the page must not read searchParams/cookies/headers,
// otherwise the route stops being static.
export const revalidate = 3600;

export default function MenuPage() {
  return (
    <main>
      <h1 className="mb-4 text-2xl font-bold">Menu</h1>
      <Suspense fallback={<DishSkeleton />}>
        <DishList />
      </Suspense>
    </main>
  );
}
