import { useRef, useState } from "react";
import Field from "../shared/Field";
import { CART_TOTAL, placeOrder } from "../shared/fakeOrder";
import { AREAS, normalizePhone, validate } from "../shared/validate";

// Exercise 6 — a submitting flag, a disabled button, and the ETB total in its label.
// Press Order twice quickly: only ONE request is sent. The guard is a ref (it holds even for
// two clicks in the same tick, before React re-renders) plus the disabled button.
export default function Exercise6_Submitting() {
  const [form, setForm] = useState({ name: "", phone: "", area: "Bole", notes: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [requests, setRequests] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const inFlight = useRef(false);
  const errors = validate(form);
  const show = (field) => touched[field] && errors[field];
  const hasVisibleErrors = Object.keys(errors).some(show);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (inFlight.current) return; // no double order
    setTouched({ name: true, phone: true, area: true, notes: true });
    if (Object.keys(errors).length > 0) return;

    inFlight.current = true;
    setSubmitting(true);
    setRequests((n) => n + 1);
    try {
      const order = await placeOrder({ ...form, phone: normalizePhone(form.phone) });
      setOrderId(order.id); // succeeded
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Exercise 6 · submitting</h2>
      <Field id="name" label="Your name" value={form.name} onChange={handleChange} onBlur={handleBlur} error={show("name")} />
      <Field id="phone" label="TeleBirr number" type="tel" hint="09… or +2519…" value={form.phone} onChange={handleChange} onBlur={handleBlur} error={show("phone")} />
      <Field id="area" as="select" label="Delivery area" value={form.area} onChange={handleChange} onBlur={handleBlur} error={show("area")}>
        {AREAS.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </Field>

      {/* disabled only while submitting, or once the person can SEE what is stopping them */}
      <button type="submit" disabled={submitting || hasVisibleErrors}>
        {submitting ? "Sending your order…" : `Order — ${CART_TOTAL} ETB`}
      </button>
      <p role="status">{submitting ? "Sending your order…" : ""}</p>
      <p>Requests sent so far: {requests}</p>
      {orderId && <p>✅ Order {orderId} received.</p>}
    </form>
  );
}
