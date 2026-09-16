import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", phone: "" });
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/checkout";

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !/^\d{10}$/.test(form.phone)) {
      setError("Enter your name and a valid 10-digit phone number.");
      return;
    }
    login(form);
    navigate(from, { replace: true });
  }

  return (
    <div className="page">
      <h2>Sign in to continue</h2>
      <p>Checkout needs your name and phone so we know who&apos;s ordering.</p>

      <form onSubmit={handleSubmit} noValidate className="order-form">
        <label htmlFor="signin-name">Name</label>
        <input id="signin-name" name="name" value={form.name} onChange={handleChange} />

        <label htmlFor="signin-phone">Phone</label>
        <input id="signin-phone" name="phone" value={form.phone} onChange={handleChange} />

        {error && <p className="field-error">{error}</p>}

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default SignIn;
