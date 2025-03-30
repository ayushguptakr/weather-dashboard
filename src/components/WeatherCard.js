import { useWeather } from '../context/WeatherContext';
import { WiHumidity, WiStrongWind, WiRain, WiCloudy, WiDaySunny } from 'react-icons/wi';

const WeatherCard = () => {
  const { weatherData, loading, error } = useWeather();

  const getWeatherClass = (weather) => {
    if (!weather) return 'default-bg';
    const weatherLower = weather.toLowerCase();
    if (weatherLower.includes('rain')) return 'rainy-bg';
    if (weatherLower.includes('drizzle')) return 'rainy-bg';
    if (weatherLower.includes('cloud')) return 'cloudy-bg';
    if (weatherLower.includes('fog')) return 'cloudy-bg';
    if (weatherLower.includes('snow')) return 'snowy-bg';
    return 'sunny-bg';
  };

  const getWeatherIcon = (weather) => {
    if (!weather) return <WiDaySunny />;
    const weatherLower = weather.toLowerCase();
    if (weatherLower.includes('rain')) return <WiRain />;
    if (weatherLower.includes('drizzle')) return <WiRain />;
    if (weatherLower.includes('cloud')) return <WiCloudy />;
    if (weatherLower.includes('fog')) return <WiCloudy />;
    return <WiDaySunny />;
  };

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
    <div className={`weather-card ${getWeatherClass(weatherData.weather[0].main)}`}>
      <div className="weather-header">
        <div className="location-info">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p className="weather-date">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="weather-icon-wrapper">
          <div className="weather-icon-container">
            {getWeatherIcon(weatherData.weather[0].main)}
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="weather-icon"
            />
          </div>
        </div>
      </div>
      
      <div className="weather-main">
        <div className="temperature-display">
          <span className="temperature-value">
            {Math.round(weatherData.main.temp)}
          </span>
          <span className="temperature-unit">°C</span>
        </div>
        <p className="weather-description">
          {weatherData.weather[0].description}
        </p>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <WiHumidity className="detail-icon" />
          <div>
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{weatherData.main.humidity}%</p>
          </div>
        </div>
        
        <div className="detail-item">
          <WiStrongWind className="detail-icon" />
          <div>
            <p className="detail-label">Wind</p>
            <p className="detail-value">{weatherData.wind.speed} km/h</p>
          </div>
        </div>
        
        <div className="detail-item">
          {weatherData.main.feels_like > weatherData.main.temp ? (
            <WiDaySunny className="detail-icon" />
          ) : (
            <WiCloudy className="detail-icon" />
          )}
          <div>
            <p className="detail-label">Feels Like</p>
            <p className="detail-value">{Math.round(weatherData.main.feels_like)}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;