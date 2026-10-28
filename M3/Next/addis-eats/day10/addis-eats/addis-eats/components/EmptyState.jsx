import Link from "next/link";

// The empty state is a screen, not "No data": say WHY it is empty and what to do next.
export default function EmptyState({ title, children, href, linkLabel }) {
  return (
    <div className="rounded border border-dashed border-stone-400 bg-white p-8 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-1 max-w-md text-stone-600">{children}</p>
      {href && <Link href={href} className="mt-4 inline-block rounded bg-amber-700 px-4 py-2 text-white">{linkLabel}</Link>}
    </div>
  );
}
