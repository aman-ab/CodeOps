import FilterShell from "./FilterShell";
import DishList from "./DishList";
import { getDishes } from "./dishes";

export const revalidate = 3600; // ISR: a menu may be an hour old

// async SERVER component: awaits its data directly.
// loading.js covers the wait, error.js catches a throw, notFound() handles empty.
export default async function MenuPage() {
  const dishes = await getDishes();
  const categories = ["All", ...new Set(dishes.map((d) => d.category))];

  return (
    <main>
      <h1 className="mb-4 text-2xl font-bold">Menu</h1>
      <FilterShell categories={categories}>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}
