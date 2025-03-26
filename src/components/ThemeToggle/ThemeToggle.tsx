import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) return null;

  const { theme, toggleTheme } = themeContext;

  const handleToggle = () => {
    console.log(`Current theme: ${theme}`);
    toggleTheme();

    console.log(`New theme: ${theme === 'dark' ? 'light' : 'dark'}`); // print current theme on console
  };

  return (
    <button className={styles.button} onClick={handleToggle}>
      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeToggle;
