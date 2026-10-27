import Link from "next/link";

// STAGE 0 (baseline): a plain <img>. No dimensions, no srcset, no lazy loading rules, the full original file.
export default function HomePage() {
  return (
    <main className="space-y-6">
      <img src="/hero.jpg" alt="A shared platter of injera with doro wot, kitfo and vegetable stews" className="w-full rounded-lg" />
      <h1 className="text-3xl font-bold">Welcome to Addis Eats</h1>
      <Link className="inline-block underline" href="/menu">See the menu</Link>
    </main>
  );
}
