import MenuBrowser from "./MenuBrowser";
import { getDishes } from "../../lib/dishes";

export const metadata = {
  title: "Menu",
  description: "Browse every dish on the Addis Eats menu. Search, filter by category and add to your cart.",
};

export default async function DishesPage() {
  const dishes = await getDishes();
  const categories = ["all", ...new Set(dishes.map((dish) => dish.category))];

  return (
    <div className="page">
      <h1 className="page-title">Our menu</h1>
      <p className="page-subtitle">Search or filter to find your next meal.</p>

      <div className="mt-8">
        <MenuBrowser categories={categories} />
      </div>
    </div>
  );
}
