import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Apply theme to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      await fetchForecast(response.data.coord.lat, response.data.coord.lon);
    } catch (err) {
      setError(err.response?.data?.message || 'City not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      setForecastData(response.data);
    } catch (err) {
      console.error("Failed to fetch forecast:", err);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        loading,
        error,
        theme,
        fetchWeather,
        toggleTheme
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);