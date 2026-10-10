import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "../shared/Field";
import { CART_TOTAL, OrderError, placeOrder } from "../shared/fakeOrder";
import { AREAS, NOTES_MAX, TELEBIRR, normalizePhone } from "../shared/validate";

// Homework — the SAME checkout with React Hook Form. Compare it with Exercise 7, line for line.
//   by hand                       React Hook Form
//   one state object              the library holds the values (uncontrolled: almost no re-renders)
//   touched tracking              mode: "onTouched" = validate after the first blur, then live
//   validate(form)                rules declared on each field
//   submitting flag               formState.isSubmitting
//   focus the first bad field     done for you (shouldFocusError) — the message, mark and wording are still yours
// (Field receives register's `ref` as a normal prop — that works because this project uses React 19.)
export default function Homework_ReactHookForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", phone: "", area: "Bole", notes: "" },
    mode: "onTouched",
  });
  const [failure, setFailure] = useState("");
  const [orderId, setOrderId] = useState(null);

  async function onSubmit(values) {
    setFailure("");
    try {
      const order = await placeOrder({ ...values, phone: normalizePhone(values.phone) });
      setOrderId(order.id);
    } catch (err) {
      if (err instanceof OrderError && err.status === 422) {
        const [first, ...rest] = Object.entries(err.fieldErrors);
        if (first) setError(first[0], { type: "server", message: first[1] }, { shouldFocus: true });
        rest.forEach(([field, message]) => setError(field, { type: "server", message }));
        setFailure(err.message);
      } else {
        setFailure(err.message);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>Homework · React Hook Form</h2>
      <Field
        id="name"
        label="Your name"
        error={errors.name?.message}
        {...register("name", { validate: (v) => v.trim() !== "" || "We need a name for the delivery" })}
      />
      <Field
        id="phone"
        label="TeleBirr number"
        type="tel"
        hint="09… or +2519… (try …0000)"
        error={errors.phone?.message}
        {...register("phone", {
          validate: (v) => TELEBIRR.test(normalizePhone(v)) || "Use 09… or +2519… (a TeleBirr number)",
        })}
      />
      <Field id="area" as="select" label="Delivery area" error={errors.area?.message} {...register("area")}>
        {AREAS.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </Field>
      <Field
        id="notes"
        as="textarea"
        rows={3}
        label="Notes (optional)"
        error={errors.notes?.message}
        {...register("notes", { maxLength: { value: NOTES_MAX, message: `Keep notes to ${NOTES_MAX} characters` } })}
      />

      {failure && (
        <p role="alert">
          <span aria-hidden="true">⚠ </span>
          {failure}
        </p>
      )}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending your order…" : `Order — ${CART_TOTAL} ETB`}
      </button>
      {orderId && <p>✅ Order {orderId} received.</p>}
    </form>
  );
}
