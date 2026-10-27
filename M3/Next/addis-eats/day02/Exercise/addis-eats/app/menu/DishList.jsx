import Link from "next/link";
import { getDishes } from "./dishes";

// async SERVER component: it awaits its own data, so Suspense can stream it
export default async function DishList() {
  await new Promise((r) => setTimeout(r, 2000)); // simulated slow query — delete in real life
  const dishes = await getDishes();

  return (
    <ul className="space-y-2">
      {dishes.map((d) => (
        <li key={d.id}>
          <Link className="underline" href={`/menu/${d.id}`}>{d.name}</Link> — {d.price} birr
        </li>
      ))}
    </ul>
  );
}
