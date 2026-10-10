import { useState } from "react";

// Delivery details. Validates first, then hands the result to the parent —
// the parent decides where to go next (useNavigate in Checkout).
function OrderForm({ initialPhone = "", onSubmit }) {
  const [form, setForm] = useState({ name: "", phone: initialPhone, area: "summit" });
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
    onSubmit(form);
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

      <button type="submit">Place order</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default OrderForm;
