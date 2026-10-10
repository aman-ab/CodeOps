import { createContext } from "react";

// Kept private to the auth folder: only AuthProvider and useAuth import it.
// Everyone else uses the useAuth hook.
export const AuthContext = createContext(null);
