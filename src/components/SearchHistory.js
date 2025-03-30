import { useWeather } from '../context/WeatherContext';

const SearchHistory = () => {
  const { searchHistory, fetchWeather } = useWeather();

  if (searchHistory.length === 0) return null;

  return (
    <div className="search-history">
      <h3>Recent Searches</h3>
      <div className="history-items">
        {searchHistory.map((city, index) => (
          <button
            key={`${city}-${index}`}
            onClick={() => fetchWeather(city)}
            className="history-item"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;