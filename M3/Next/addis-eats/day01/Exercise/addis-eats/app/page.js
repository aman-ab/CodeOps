import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1 className="text-3xl font-bold">Welcome to Addis Eats</h1>
      <Link className="mt-4 inline-block underline" href="/menu">See the menu</Link>
    </main>
  );
}
