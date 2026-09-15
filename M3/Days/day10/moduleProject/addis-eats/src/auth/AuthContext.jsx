import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Private to this module -- components never import AuthContext directly,
// only the useAuth hook below.
const AuthContext = createContext(null);
const STORAGE_KEY = "addis-eats-session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, phone } once signed in
  const [isLoading, setIsLoading] = useState(true); // restoring the session on first load

  // Simulates the real-world case a guard has to handle: on first load you
  // don't know yet whether there's a session, so there's a brief loading
  // phase before you can decide to render or redirect.
  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(() => {
      if (cancelled) return;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch {
        // ignore corrupted storage
      } finally {
        setIsLoading(false);
      }
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login: (info) => {
        setUser(info);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
        } catch {
          // storage full or unavailable -- session still works in memory
        }
      },
      logout: () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
      },
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}
