import { useState } from "react";
import { validate } from "../shared/validate";

// Exercise 3 — validate(form) is a PURE function (shared/validate.js), called during render.
// `errors` is derived: it is recalculated from `form` every time, so it can never disagree with
// the values. (Run it alone, with no React:  npm run test:validate.)
//
// NOTE: this step deliberately shows every error from the very first render, on every keystroke.
// That is the "scolds you before you finish typing" timing — Exercise 4 fixes it.
export default function Exercise3_Validate() {
  const [form, setForm] = useState({ name: "", phone: "", area: "Bole", notes: "" });
  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Exercise 3 · validate(form), derived</h2>
      <p>
        <label htmlFor="name">Name </label>
        <input id="name" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <small> {errors.name}</small>}
      </p>
      <p>
        <label htmlFor="phone">TeleBirr number </label>
        <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
        {errors.phone && <small> {errors.phone}</small>}
      </p>
      <button type="submit" disabled={hasErrors}>
        Order
      </button>
      <pre>errors: {JSON.stringify(errors, null, 2)}</pre>
    </form>
  );
}
