import { useState } from "react";
import { validate } from "../shared/validate";

// Exercise 4 — touched fields. An empty field is invalid from the first render, but the person
// has not done anything wrong yet. Show an error only AFTER the field was visited (blur);
// from then on it updates on every keystroke, so it disappears the moment they fix it.
export default function Exercise4_Touched() {
  const [form, setForm] = useState({ name: "", phone: "", area: "Bole", notes: "" });
  const [touched, setTouched] = useState({});
  const errors = validate(form);
  const show = (field) => touched[field] && errors[field];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, phone: true, area: true, notes: true }); // a submit attempt visits every field
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Exercise 4 · touched on blur</h2>
      <p>
        <label htmlFor="name">Name </label>
        <input id="name" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} />
        {show("name") && <small> {errors.name}</small>}
      </p>
      <p>
        <label htmlFor="phone">TeleBirr number </label>
        <input id="phone" name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur} />
        {show("phone") && <small> {errors.phone}</small>}
      </p>
      <button type="submit">Order</button>
      <pre>touched: {JSON.stringify(touched)}</pre>
      <p>Click into a field and out again without typing; then type a valid value.</p>
    </form>
  );
}
