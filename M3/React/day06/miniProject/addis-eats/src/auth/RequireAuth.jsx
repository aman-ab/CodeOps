import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Guard component: renders what it wraps, or redirects to /login.
//   1. loading FIRST — while the saved session is being read, `user` is null.
//      Redirecting on that would bounce a signed-in person to /login on every refresh.
//   2. then user.
//   3. <Navigate> (not navigate()) because we are redirecting while rendering.
//      `replace` keeps the back button from returning to the page that rejected them;
//      `state.from` remembers where they were going.
function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Checking your session…</p>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}

export default RequireAuth;
