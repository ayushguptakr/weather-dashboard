// src/context/WeatherContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  // Weather state
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Apply theme to HTML root element on mount and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch current weather data
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      updateSearchHistory(city);
      await fetchForecast(response.data.coord.lat, response.data.coord.lon);
    } catch (err) {
      setError(err.response?.data?.message || 'City not found');
    } finally {
      setLoading(false);
    }
  };

  // Fetch 5-day forecast data
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

  // Update search history
  const updateSearchHistory = (city) => {
    setSearchHistory(prev => {
      const newHistory = [city, ...prev.filter(item => item.toLowerCase() !== city.toLowerCase())];
      return newHistory.slice(0, 5);
    });
  };

  // Clear weather data
  const clearWeatherData = () => {
    setWeatherData(null);
    setForecastData(null);
    setError(null);
  };

  // Toggle theme between light/dark
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Refresh current weather
  const refreshWeather = async () => {
    if (weatherData) {
      await fetchWeather(weatherData.name);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        forecastData,
        loading,
        error,
        searchHistory,
        theme,
        fetchWeather,
        clearWeatherData,
        refreshWeather,
        toggleTheme
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);