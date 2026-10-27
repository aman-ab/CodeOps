"use client"; // useActionState
import { useActionState } from "react";
import { kitchenCancelOrder } from "../actions";

export default function KitchenCancelForm({ orderId }) {
  const [state, formAction, pending] = useActionState(kitchenCancelOrder, null);
  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="orderId" value={orderId} />
      <button disabled={pending} className="rounded border px-2 py-1 text-sm disabled:opacity-50">
        {pending ? "Cancelling…" : "Cancel (kitchen)"}
      </button>
      {state?.error && <span className="text-sm text-red-700">{state.error}</span>}
    </form>
  );
}
