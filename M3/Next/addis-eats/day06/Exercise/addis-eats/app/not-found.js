import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1 className="text-2xl font-bold">404 – Not found</h1>
      <p>That page or dish does not exist.</p>
      <Link className="underline" href="/menu">Back to the menu</Link>
    </main>
  );
}
