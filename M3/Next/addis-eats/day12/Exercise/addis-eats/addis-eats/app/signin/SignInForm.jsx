"use client"; // useActionState
import { useActionState } from "react";
import { signIn } from "../actions";

export default function SignInForm({ next }) {
  const [state, formAction, pending] = useActionState(signIn, null);
  const field = "w-full rounded border bg-white p-2";

  return (
    <form action={formAction} className="max-w-sm space-y-3">
      {state?.error && <p className="rounded bg-red-50 p-2 text-red-700">{state.error}</p>}
      <input type="hidden" name="next" value={next} />
      <label className="block">Phone number
        <input name="phone" defaultValue={state?.phone} autoComplete="tel" placeholder="0911000001" className={field} />
      </label>
      <label className="block">Password
        <input name="password" type="password" autoComplete="current-password" className={field} />
      </label>
      <button disabled={pending} className="rounded bg-green-700 px-4 py-2 text-white disabled:opacity-50">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
