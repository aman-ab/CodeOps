import { useState } from "react";
import { validateOrderForm } from "./validate";

const AREAS = ["Summit", "CMC", "Bole", "22","Megnagna","Akaki Kaliti","4 Kilo","Kazanchis","Sar Bet"];

// A fully controlled form: every input's value comes from React state, and
// every keystroke updates that state through onChange -- the DOM never
// holds its own copy of the truth. Validation errors are just derived from
// that same state on submit.
function OrderForm({ initialValues, onSubmit }) {
  const [form, setForm] = useState(() => ({
    name: initialValues?.name || "",
    phone: initialValues?.phone || "",
    area: initialValues?.area || AREAS[0],
  }));
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validateOrderForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onSubmit(form);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="order-form">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
        aria-invalid={!!errors.name}
      />
      {errors.name && <p className="field-error">{errors.name}</p>}

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        aria-invalid={!!errors.phone}
      />
      {errors.phone && <p className="field-error">{errors.phone}</p>}

      <label htmlFor="area">Delivery area</label>
      <select id="area" name="area" value={form.area} onChange={handleChange}>
        {AREAS.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>

      <button type="submit">Place order</button>
    </form>
  );
}

export default OrderForm;
