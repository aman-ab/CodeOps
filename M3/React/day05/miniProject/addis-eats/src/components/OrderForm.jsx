import { useState } from "react";

// Day 29's form, tidied: starts empty, and validates BEFORE it confirms.
function OrderForm({ onSubmitted }) {
  const [form, setForm] = useState({ name: "", phone: "", area: "summit" });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.name.trim() === "") {
      setMessage("Please enter your name.");
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setMessage("Phone must be exactly 10 digits.");
      return;
    }
    setMessage(`Order submitted: ${form.name}, ${form.area}`);
    onSubmitted();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name"> Name:</label>
      <input id="name" name="name" value={form.name} onChange={handleChange} />

      <label htmlFor="phone"> Phone:</label>
      <input id="phone" name="phone" value={form.phone} onChange={handleChange} />

      <label htmlFor="area"> Area:</label>
      <select id="area" name="area" value={form.area} onChange={handleChange}>
        <option value="summit">summit</option>
        <option value="cmc">cmc</option>
        <option value="bole">bole</option>
        <option value="22">22</option>
      </select>

      <button type="submit">submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default OrderForm;
