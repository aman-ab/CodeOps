import { useTheme } from "../theme/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Theme: {theme} (switch to {theme === "light" ? "warm" : "light"})
    </button>
  );
}

export default ThemeToggle;
