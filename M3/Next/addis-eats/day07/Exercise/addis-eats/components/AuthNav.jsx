"use client"; // SWR + usePathname
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { signOut } from "../app/actions";

// COSMETIC ONLY (layer 4 in AUTH.md): it shows or hides links. Every protected thing
// is refused on the server whether or not this component shows a link to it.
export default function AuthNav() {
  const pathname = usePathname();
  const { data, mutate } = useSWR("/api/me", fetcher);

  // The header lives in the root layout and never remounts, so re-ask on every navigation
  useEffect(() => { mutate(); }, [pathname, mutate]);

  if (!data) return <div className="ml-auto h-6 w-28" />;
  const user = data.user;

  if (!user) {
    const href = pathname.startsWith("/signin") ? "/signin" : `/signin?next=${encodeURIComponent(pathname)}`;
    return <div className="ml-auto"><Link href={href}>Sign in</Link></div>;
  }

  return (
    <div className="ml-auto flex items-center gap-3 text-sm">
      <span>Hi, {user.name}{user.role === "staff" && " (staff)"}</span>
      {user.role === "staff" && <Link className="underline" href="/kitchen">Kitchen</Link>}
      <form action={signOut} onSubmit={() => mutate({ user: null }, { revalidate: false })}>
        <button className="underline">Sign out</button>
      </form>
    </div>
  );
}
