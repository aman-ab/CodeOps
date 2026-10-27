import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { safeNext } from "../../lib/safeNext";
import SignInForm from "./SignInForm";

export default async function SignInPage({ searchParams }) {
  const sp = await searchParams;
  const next = safeNext(typeof sp.next === "string" ? sp.next : "/"); // ?next=… is user input

  if (await getSession()) redirect(next); // already signed in

  return (
    <main className="space-y-3">
      <h1 className="text-2xl font-bold">Sign in</h1>
      {next !== "/" && <p className="text-sm text-stone-600">Sign in to continue to <code>{next}</code>.</p>}
      <SignInForm next={next} />
      <p className="text-xs text-stone-500">Demo accounts: see the README.</p>
    </main>
  );
}
