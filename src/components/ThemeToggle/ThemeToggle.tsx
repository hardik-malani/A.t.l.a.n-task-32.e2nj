import React, { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

const ThemeToggle: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;
  const { theme, toggleTheme } = themeContext;

  return (
    <button
      className={styles.button}
      onClick={toggleTheme}
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
