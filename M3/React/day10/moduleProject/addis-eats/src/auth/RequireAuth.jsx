import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

function RequireAuth({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <p className="page">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
