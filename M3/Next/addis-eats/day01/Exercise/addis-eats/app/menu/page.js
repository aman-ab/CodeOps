import DishList from "./DishList";
import CategoryBar from "./CategoryBar";
import { dishes } from "./dishes";

// TEMPORARY test switches:  /menu?slow=1  shows loading.js,  /menu?crash=1  shows error.js
export default async function MenuPage({ searchParams }) {
  const { slow, crash } = await searchParams;
  if (slow) await new Promise((r) => setTimeout(r, 3000));
  if (crash) throw new Error("Deliberate menu failure");

  return (
    <main>
      <h1 className="text-2xl font-bold">Menu</h1>
      <CategoryBar />
      <DishList dishes={dishes} />
    </main>
  );
}
