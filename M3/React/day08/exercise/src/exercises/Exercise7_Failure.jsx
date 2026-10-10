import { useEffect, useRef, useState } from "react";
import Field from "../shared/Field";
import { CART_TOTAL, OrderError, placeOrder } from "../shared/fakeOrder";
import { AREAS, normalizePhone, validate } from "../shared/validate";

// Exercise 7 — simulate a failed request: show the reason, KEEP every value, focus the first bad field.
//   • tick "Simulate a network failure"  -> a general failure: focus moves to the message
//   • type a phone ending in 0000        -> a 422: the message appears beside the phone field and focus goes there
// Nothing ever resets the form on failure.
const FIELDS = ["name", "phone", "area", "notes"];

export default function Exercise7_Failure() {
  const [form, setForm] = useState({ name: "", phone: "", area: "Bole", notes: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [failure, setFailure] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [simulateNetwork, setSimulateNetwork] = useState(false);
  const inFlight = useRef(false);
  const failureRef = useRef(null);
  const errors = validate(form);
  const messageFor = (field) => (touched[field] && errors[field]) || serverErrors[field];
  const hasVisibleErrors = FIELDS.some(messageFor);

  useEffect(() => {
    if (failure?.kind === "general") failureRef.current?.focus();
  }, [failure]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setServerErrors((s) => {
      if (!(name in s)) return s;
      const next = { ...s };
      delete next[name];
      return next;
    });
  }
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (inFlight.current) return;
    setTouched({ name: true, phone: true, area: true, notes: true });
    const firstInvalid = FIELDS.find((f) => errors[f]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    setFailure(null);
    setServerErrors({});
    try {
      const order = await placeOrder(
        { ...form, phone: normalizePhone(form.phone) },
        { simulate: simulateNetwork ? "network" : undefined },
      );
      setOrderId(order.id);
    } catch (err) {
      if (err instanceof OrderError && err.status === 422) {
        setServerErrors(err.fieldErrors);
        setFailure({ message: err.message, kind: "field" });
        const first = FIELDS.find((f) => err.fieldErrors[f]);
        if (first) document.getElementById(first)?.focus(); // the first bad field
      } else {
        setFailure({ message: err.message, kind: "general" });
      }
      // note what is NOT here: no setForm(...) — every value stays as typed
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Exercise 7 · failure</h2>
      <Field id="name" label="Your name" value={form.name} onChange={handleChange} onBlur={handleBlur} error={messageFor("name")} />
      <Field id="phone" label="TeleBirr number" type="tel" hint="try …0000 for a 422" value={form.phone} onChange={handleChange} onBlur={handleBlur} error={messageFor("phone")} />
      <Field id="area" as="select" label="Delivery area" value={form.area} onChange={handleChange} onBlur={handleBlur} error={messageFor("area")}>
        {AREAS.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </Field>

      <p>
        <label>
          <input type="checkbox" checked={simulateNetwork} onChange={(e) => setSimulateNetwork(e.target.checked)} /> Simulate
          a network failure
        </label>
      </p>

      {failure && (
        <p role="alert" tabIndex={-1} ref={failureRef}>
          <span aria-hidden="true">⚠ </span>
          {failure.message}
        </p>
      )}

      <button type="submit" disabled={submitting || hasVisibleErrors}>
        {submitting ? "Sending your order…" : `Order — ${CART_TOTAL} ETB`}
      </button>
      <p role="status">{submitting ? "Sending your order…" : ""}</p>
      {orderId && <p>✅ Order {orderId} received.</p>}
    </form>
  );
}
