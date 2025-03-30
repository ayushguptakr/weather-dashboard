// src/components/ThemeToggle.js
import { useWeather } from '../context/WeatherContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useWeather();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
};