import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";

// Exercise 1 — ThemeContext read from a deeply nested component.
// Page -> Layout -> Sidebar -> Panel -> ThemedBadge: only ThemedBadge reads the theme,
// and none of the components in between receive a `theme` prop.

function ThemedBadge() {
  const theme = useContext(ThemeContext); // 3. consume
  const style =
    theme === "dark"
      ? { background: "#222", color: "#fff", padding: 8 }
      : { background: "#eee", color: "#000", padding: 8 };
  return <div style={style}>Current theme: {theme}</div>;
}

function Panel() {
  return <ThemedBadge />;
}
function Sidebar() {
  return <Panel />;
}
function Layout() {
  return <Sidebar />;
}

export default function Exercise1_Theme() {
  const [theme, setTheme] = useState("light"); // the state lives here, not in the context

  return (
    // 2. provide
    <ThemeContext.Provider value={theme}>
      <h2>Exercise 1 · ThemeContext</h2>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </button>
      <Layout />
    </ThemeContext.Provider>
  );
}
