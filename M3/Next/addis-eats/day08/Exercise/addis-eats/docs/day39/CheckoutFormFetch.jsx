"use client";
// EXERCISE 4 — the intermediate version: form -> fetch("/api/orders"), branching on the status code.
// Exercise 5 deletes this file's fetch call entirely (app/checkout/CheckoutForm.jsx is the result).
import { useState } from "react";
import { useCart } from "../../components/CartProvider";
import { AREAS } from "../../lib/areas";

export default function CheckoutFormFetch() {
  const { items, clear } = useCart();
  const [status, setStatus] = useState("idle"); // idle | submitting | failed | succeeded
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        phone: form.get("phone"),
        area: form.get("area"),
        items: items.map(({ id, qty }) => ({ id, qty })),
      }),
    });
    const data = await res.json();

    if (res.status === 201) { clear(); setMessage(`Order ${data.id} placed`); setStatus("succeeded"); }
    else if (res.status === 422) { setFieldErrors(data.fieldErrors ?? {}); setStatus("failed"); }
    else { setMessage(data.error ?? "Something went wrong"); setStatus("failed"); }
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="name" /> {fieldErrors.name?.[0]}
      <input name="phone" /> {fieldErrors.phone?.[0]}
      <select name="area">{AREAS.map((a) => <option key={a}>{a}</option>)}</select> {fieldErrors.area?.[0]}
      <button disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Place order"}</button>
      {message}
    </form>
  );
}
