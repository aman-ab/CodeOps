import { useState } from "react";

// Exercise 1 — name, TeleBirr phone, delivery area and optional notes in ONE state object,
// changed by ONE handler. Each input has a `name`, so the computed key [name] picks the field:
// a fifth field costs one line of JSX and the handler never changes.
export default function Exercise1_OneState() {
  const [form, setForm] = useState({ name: "", phone: "", area: "Bole", notes: "" });
  const [sent, setSent] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value })); // updater form: always the latest state
  }

  function handleSubmit(e) {
    e.preventDefault(); // no page reload
    setSent(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Exercise 1 · one state object</h2>
      <p>
        <label htmlFor="name">Name </label>
        <input id="name" name="name" value={form.name} onChange={handleChange} />
      </p>
      <p>
        <label htmlFor="phone">TeleBirr number </label>
        <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
      </p>
      <p>
        <label htmlFor="area">Delivery area </label>
        <input id="area" name="area" value={form.area} onChange={handleChange} />
      </p>
      <p>
        <label htmlFor="notes">Notes (optional) </label>
        <input id="notes" name="notes" value={form.notes} onChange={handleChange} />
      </p>
      <button type="submit">Order</button>
      <pre>state: {JSON.stringify(form, null, 2)}</pre>
      {sent && <p>Submitted (page did not reload): {sent.name}</p>}
    </form>
  );
}
