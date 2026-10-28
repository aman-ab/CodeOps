import { buildMetadata } from "../../lib/seo";
import FilterShell from "./FilterShell";
import DishList from "./DishList";
import DishSearch from "./DishSearch";
import { getDishes } from "./dishes";
import { AREAS } from "../../lib/areas";

export const revalidate = 3600; // ISR: a menu may be an hour old

// Exercise 2: built from the data, so the count and the dish names can never go stale.
export async function generateMetadata() {
  const dishes = await getDishes();
  const names = new Intl.ListFormat("en-GB", { type: "conjunction" }).format(dishes.slice(0, 3).map((d) => d.name));
  const areas = new Intl.ListFormat("en-GB", { type: "conjunction" }).format(AREAS);
  return buildMetadata({
    title: "Menu",
    description: `Browse ${dishes.length} Ethiopian dishes, including ${names}, with prices in birr. Delivery to ${areas}.`,
    path: "/menu", // /menu?ref=telegram and /menu/ are the same page: this says which URL counts
  });
}

// async SERVER component: awaits its data directly.
// loading.js covers the wait, error.js catches a throw, notFound() handles empty.
export default async function MenuPage() {
  await new Promise((r) => setTimeout(r, 1500)); // simulated slow query — delete in real life
  const dishes = await getDishes();
  const categories = ["All", ...new Set(dishes.map((d) => d.category))];

  return (
    <main>
      <h1 className="mb-4 text-2xl font-bold">Menu</h1>
      <DishSearch />
      <FilterShell categories={categories}>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}
