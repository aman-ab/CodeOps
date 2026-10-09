import { createContext, useContext, useEffect, useState } from "react";
import {
  Link,
  MemoryRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LocationBar from "../shared/LocationBar";

// Exercise 7 — RequireAuth guarding /checkout, and returning the person there after signing in.
// The demo STARTS at /checkout while signed out. Sign in -> you land back on /checkout.
// The session is kept in sessionStorage: refresh the browser while signed in and you
// stay on /checkout, because the guard waits for `loading` before deciding.

const KEY = "d31-ex7-user";
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // reading the saved session takes a moment; until then `user` is null
      setUser(sessionStorage.getItem(KEY));
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  function login(phone) {
    sessionStorage.setItem(KEY, phone);
    setUser(phone);
  }
  function logout() {
    sessionStorage.removeItem(KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

function RequireAuth({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <p>Checking your session…</p>; // 1. loading FIRST
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />; // 2. then user
  return children;
}

function Login() {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const from = location.state?.from?.pathname ?? "/";

  function handleSubmit(e) {
    e.preventDefault();
    login(phone);
    navigate(from, { replace: true }); // back to where they were going
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Sign in to continue to {from}</p>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0911223344" />
      <button type="submit" disabled={phone === ""}>
        Sign in
      </button>
    </form>
  );
}

function Checkout() {
  const { user, logout } = useContext(AuthContext);
  return (
    <p>
      💳 Checkout for {user} <button onClick={logout}>Sign out</button>
    </p>
  );
}

export default function Exercise7_RequireAuth() {
  return (
    <AuthProvider>
      <MemoryRouter initialEntries={["/checkout"]}>
        <h2>Exercise 7 · RequireAuth</h2>
        <LocationBar />
        <p>
          <Link to="/">Home</Link> | <Link to="/checkout">Checkout</Link>
        </p>
        <Routes>
          <Route path="/" element={<p>🏠 Home (public)</p>} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}
