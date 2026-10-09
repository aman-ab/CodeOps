import { createContext } from "react";

// Default "light" is used only if a component is rendered with no provider above it.
export const ThemeContext = createContext("light");
