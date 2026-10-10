import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { selectItems, selectTotal, useCartStore } from "../cart/cartStore";
import { groupItems } from "../cart/groupItems";
import { useAuth } from "../auth/useAuth";
import { OrderError, placeOrder } from "../api/orders";
import { AREAS, NOTES_MAX, normalizePhone, validate } from "./validate";
import Field from "./Field";

const FIELDS = ["name", "phone", "area", "notes"]; // DOM order = the order focus visits them

// The six states of this form:
//   pristine   – nothing touched, no errors shown          (touched = {})
//   dirty      – their input, kept exactly as typed        (form)
//   invalid    – message beside the field, in words        (errors + touched)
//   submitting – disabled button, "Sending…"               (submitting)
//   failed     – the reason, every value kept, focus moved (failure / serverErrors)
//   succeeded  – redirect to the receipt, replace: true    (navigate)
function Checkout() {
  const items = useCartStore(selectItems);
  const total = useCartStore(selectTotal);
  const clear = useCartStore((s) => s.clear);
  const { user } = useAuth();
  const navigate = useNavigate();

  // all four fields live in ONE object, changed by ONE handler
  const [form, setForm] = useState({ name: "", phone: user.phone, area: AREAS[0], notes: "" });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({}); // a 422: { phone: "…" }
  const [failure, setFailure] = useState(null); // { message, kind }
  const [simulateNetworkFailure, setSimulateNetworkFailure] = useState(false);
  const inFlight = useRef(false); // a guard that works even for two clicks in the same tick
  const failureRef = useRef(null);

  // DERIVED on every render — never stored, so it can never be out of date
  const errors = validate(form);
  // show an error only after the field was visited (or after a submit attempt),
  // then it updates live as the person corrects it
  const messageFor = (field) => (touched[field] && errors[field]) || serverErrors[field];
  const hasVisibleErrors = FIELDS.some((field) => messageFor(field));

  // a failure with no bad field (e.g. the network dropped): move focus to the message
  useEffect(() => {
    if (failure?.kind === "general") failureRef.current?.focus();
  }, [failure]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value })); // updater form: always the latest state
    setServerErrors((s) => {
      if (!(name in s)) return s;
      const next = { ...s };
      delete next[name]; // they are fixing it: drop the server's message for this field
      return next;
    });
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault(); // no page reload
    if (inFlight.current) return; // no double order

    // a submit attempt counts as visiting every field
    setTouched({ name: true, phone: true, area: true, notes: true });
    const firstInvalid = FIELDS.find((field) => errors[field]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus(); // land on the problem
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    setFailure(null);
    setServerErrors({});
    try {
      const order = await placeOrder(
        { form: { ...form, name: form.name.trim(), phone: normalizePhone(form.phone) }, items, total },
        { simulate: simulateNetworkFailure ? "network" : undefined },
      );
      navigate(`/orders/${order.id}`, { replace: true }); // succeeded
      clear();
    } catch (err) {
      // failed: NEVER clear the form — every value stays exactly as typed
      if (err instanceof OrderError && err.status === 422) {
        setServerErrors(err.fieldErrors);
        setFailure({ message: err.message, kind: "field" });
        const first = FIELDS.find((field) => err.fieldErrors[field]);
        if (first) document.getElementById(first)?.focus();
      } else {
        setFailure({
          message:
            err instanceof OrderError
              ? err.message
              : "Something went wrong. Your order is still here — please try again.",
          kind: "general",
        });
      }
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="main-c">
        <h2>Checkout</h2>
        <p>
          Your cart is empty. <Link to="/menu">Add something from the menu</Link>
        </p>
      </div>
    );
  }

  const lines = groupItems(items);

  return (
    <div className="main-c">
      <h2>Checkout</h2>
      {lines.map(({ dish, qty }) => (
        <p key={dish.id}>
          {dish.name} × {qty} — {dish.price * qty} ETB
        </p>
      ))}
      <p>Total: {total} ETB</p>

      <h2>Delivery details</h2>
      {/* the handler is on the FORM, not the button: Enter works and screen readers announce it */}
      <form onSubmit={handleSubmit} noValidate>
        <Field
          id="name"
          label="Your name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={messageFor("name")}
        />
        <Field
          id="phone"
          label="TeleBirr number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          hint="09… or +2519…"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={messageFor("phone")}
        />
        <Field
          id="area"
          as="select"
          label="Delivery area"
          value={form.area}
          onChange={handleChange}
          onBlur={handleBlur}
          error={messageFor("area")}
        >
          {AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </Field>
        <Field
          id="notes"
          as="textarea"
          label="Notes for the kitchen (optional)"
          rows={3}
          hint={`${form.notes.length}/${NOTES_MAX}`}
          value={form.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          error={messageFor("notes")}
        />

        {failure && (
          <p role="alert" tabIndex={-1} ref={failureRef}>
            <span aria-hidden="true">⚠ </span>
            {failure.message}
          </p>
        )}

        {/* the button carries the state — and the price. It is only disabled while
            submitting or when the person can SEE what is stopping them. */}
        <button type="submit" disabled={submitting || hasVisibleErrors}>
          {submitting ? "Sending your order…" : `Order — ${total} ETB`}
        </button>
        <p role="status">{submitting ? "Sending your order…" : ""}</p>
      </form>

      <details>
        <summary>Testing aids (not part of the real form)</summary>
        <label>
          <input
            type="checkbox"
            checked={simulateNetworkFailure}
            onChange={(e) => setSimulateNetworkFailure(e.target.checked)}
          />{" "}
          Simulate a network failure on the next order
        </label>
        <p>Or use a phone number ending in 0000 to get a 422 from the pretend server.</p>
      </details>
    </div>
  );
}

export default Checkout;
