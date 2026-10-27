import Link from "next/link";

// a plain component — not a route
export default function DishList({ dishes }) {
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
