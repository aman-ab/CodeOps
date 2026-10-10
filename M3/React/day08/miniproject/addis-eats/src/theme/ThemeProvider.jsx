import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const STORAGE_KEY = "addis-eats-theme";

// Two themes that keep the text readable on the cards from style.css
// (cards have a fixed light background, which we are not allowed to change).
const THEMES = {
  light: { backgroundColor: "", color: "" },
  warm: { backgroundColor: "#fff3dc", color: "#3b2a1a" },
};

function readSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved in THEMES ? saved : "light";
  } catch {
    return "light";
  }
}

// Its own provider: the theme changes almost never, so it must not share a value
// with anything busy. (The cart is not in context any more at all.)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readSavedTheme);

  // Applying the theme touches the DOM outside React, so it is an effect.
  useEffect(() => {
    const { backgroundColor, color } = THEMES[theme];
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = color;
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === "light" ? "warm" : "light";
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // not saved, still applied for this visit
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
