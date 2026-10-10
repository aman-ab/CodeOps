import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState("Amanuel");
  const logout = useCallback(() => setUser(null), []);
  const login = useCallback(() => setUser("Amanuel"), []);
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
