import { useState } from "react";
import Field from "../shared/Field";
import { AREAS, validate } from "../shared/validate";

// Exercise 5 — label every field, wire aria-invalid / aria-describedby / role="alert"
// (all inside shared/Field.jsx), and add a summary that says HOW MANY fields need attention.
// Try it with a screen reader, with the keyboard only, and with the screen in greyscale.
const FIELDS = ["name", "phone", "area", "notes"];

export default function Exercise5_Accessible() {
  const [form, setForm] = useState({ name: "", phone: "", area: "Bole", notes: "" });
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const errors = validate(form);
  const show = (field) => touched[field] && errors[field];
  const errorCount = Object.keys(errors).length;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  function handleSubmit(e) {
    e.preventDefault();
    setAttempted(true);
    setTouched({ name: true, phone: true, area: true, notes: true });
    const first = FIELDS.find((f) => errors[f]);
    if (first) document.getElementById(first)?.focus(); // land on the problem
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Exercise 5 · labels and aria</h2>

      {attempted && errorCount > 0 && (
        <div role="alert">
          <p>
            Please fix {errorCount} field{errorCount === 1 ? "" : "s"}:
          </p>
          <ul>
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}>
                <a href={`#${field}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Field id="name" label="Your name" value={form.name} onChange={handleChange} onBlur={handleBlur} error={show("name")} />
      <Field
        id="phone"
        label="TeleBirr number"
        type="tel"
        hint="09… or +2519…"
        value={form.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={show("phone")}
      />
      <Field id="area" as="select" label="Delivery area" value={form.area} onChange={handleChange} onBlur={handleBlur} error={show("area")}>
        {AREAS.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </Field>
      <button type="submit">Order</button>
    </form>
  );
}
