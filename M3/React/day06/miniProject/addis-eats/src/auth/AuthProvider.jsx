import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

const STORAGE_KEY = "addis-eats-user";

// A pretend sign-in: the "session" is a phone number kept in localStorage.
// Reading it takes a moment (like a real token check), which is exactly why
// `loading` exists — see RequireAuth.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setUser(JSON.parse(saved));
      } catch {
        
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback(async (phone) => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // pretend network
    const next = { phone };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // still signed in for this visit
    }
    setUser(next);
    return next;
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // nothing to clean up
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
