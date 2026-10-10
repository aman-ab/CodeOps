import { useState } from "react";
import { AREAS } from "../shared/validate";

// Exercise 2 — bind each input type correctly.
//   select    -> value on the <select>, not `selected` on an <option>
//   textarea  -> value + onChange, NOT children as in plain HTML
//   checkbox  -> checked + onChange, read e.target.checked
//   radio     -> checked={form.pay === "telebirr"}
//   file      -> cannot be controlled: read e.target.files yourself
export default function Exercise2_InputTypes() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
    callMe: false,
    pay: "telebirr",
  });
  const [fileNames, setFileNames] = useState([]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    // one handler for every type: checkboxes carry `checked`, everything else `value`
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Exercise 2 · every input type</h2>

      <p>
        <label htmlFor="area">Delivery area </label>
        <select id="area" name="area" value={form.area} onChange={handleChange}>
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </p>

      <p>
        <label htmlFor="notes">Notes (optional) </label>
        <br />
        <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={handleChange} />
      </p>

      <p>
        <label>
          <input type="checkbox" name="callMe" checked={form.callMe} onChange={handleChange} /> Call me
          when the rider arrives
        </label>
      </p>

      <fieldset>
        <legend>Pay with</legend>
        {["telebirr", "cash"].map((method) => (
          <label key={method}>
            <input
              type="radio"
              name="pay"
              value={method}
              checked={form.pay === method}
              onChange={handleChange}
            />{" "}
            {method}{" "}
          </label>
        ))}
      </fieldset>

      <p>
        <label htmlFor="photo">Photo of your door (uncontrolled) </label>
        <input
          id="photo"
          type="file"
          onChange={(e) => setFileNames(Array.from(e.target.files).map((f) => f.name))}
        />
      </p>

      <pre>state: {JSON.stringify(form, null, 2)}</pre>
      <p>Files: {fileNames.join(", ") || "none"}</p>
    </form>
  );
}
