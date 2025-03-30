import { useState } from 'react';
import { useWeather } from '../context/WeatherContext';

export const SearchBar = () => {
  const [city, setCity] = useState('');
  const { fetchWeather, loading } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="search-input"
        disabled={loading}
      />
      <button
        type="submit"
        className="search-button"
        disabled={loading || !city.trim()}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};
export default SearchBar;