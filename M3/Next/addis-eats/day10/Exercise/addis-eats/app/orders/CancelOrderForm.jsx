"use client"; // useActionState
import { useActionState } from "react";
import { cancelOrder } from "../actions";

// The button is visible to EVERYONE on purpose: hiding it would be UX, not security.
// The action itself refuses anyone who is not signed in or does not own the order.
export default function CancelOrderForm({ orderId }) {
  const [state, formAction, pending] = useActionState(cancelOrder, null);
  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="orderId" value={orderId} />
      <button disabled={pending} className="rounded border px-2 py-1 text-sm disabled:opacity-50">
        {pending ? "Cancelling…" : "Cancel order"}
      </button>
      {state?.error && <span className="text-sm text-red-700">{state.error}</span>}
    </form>
  );
}
