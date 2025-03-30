import { useWeather } from '../context/WeatherContext';

export const WeatherCard = () => {
  const { weatherData, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="empty-state">
        Search for a city to view weather information
      </div>
    );
  }

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
          className="weather-icon"
        />
      </div>
      
      <div className="weather-main">
        <p className="temperature">
          {Math.round(weatherData.main.temp)}°C
        </p>
        <p className="weather-description">
          {weatherData.weather[0].description}
        </p>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <p>Humidity</p>
          <p>{weatherData.main.humidity}%</p>
        </div>
        <div className="detail-item">
          <p>Wind Speed</p>
          <p>{weatherData.wind.speed} km/h</p>
        </div>
      </div>
    </div>
  );
};