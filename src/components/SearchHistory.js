import { useWeather } from '../context/WeatherContext';

export const SearchHistory = () => {
  const { searchHistory, fetchWeather } = useWeather();

  if (searchHistory.length === 0) return null;

  return (
    <div className="search-history">
      <h3>Recent Searches</h3>
      <ul>
        {searchHistory.map((city, index) => (
          <li key={index}>
            <button
              onClick={() => fetchWeather(city)}
              className="history-item"
            >
              {city}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};