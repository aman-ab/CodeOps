import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { TELEBIRR, normalizePhone } from "../checkout/validate";

// /login — sends the person back to where they were going.
function Login() {
  const { user, loading, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // RequireAuth put the page they wanted in location.state.from
  const from = location.state?.from?.pathname ?? "/menu";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!TELEBIRR.test(normalizePhone(phone))) {
      setError("Use 09… or +2519… (a TeleBirr number).");
      return;
    }
    setError("");
    setBusy(true);
    await login(normalizePhone(phone));
    navigate(from, { replace: true }); // e.g. back to /checkout
  }

  if (loading) return <p>Checking your session…</p>;
  // already signed in and opened /login by hand: redirect while rendering
  if (user && !busy) return <Navigate to={from} replace />;

  return (
    <div className="main-c">
      <h2>Sign in</h2>
      {location.state?.from && <p>Please sign in to continue to {from}.</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-phone"> Phone:</label>
        <input
          id="login-phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0911223344"
        />
        <button type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
