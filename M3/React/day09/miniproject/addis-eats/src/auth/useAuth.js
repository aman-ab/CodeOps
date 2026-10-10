import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// The guarded front door. Forget <AuthProvider> and you get this message
// immediately, instead of "cannot read properties of null" somewhere unrelated.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return ctx;
}
