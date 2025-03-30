import { useWeather } from '../context/WeatherContext';

const Forecast = () => {
  const { forecastData } = useWeather();

  if (!forecastData) return null;

  // Group forecast by day
  const dailyForecast = forecastData.list.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-cards">
        {Object.entries(dailyForecast).slice(0, 5).map(([date, items]) => {
          const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
          const avgTemp = Math.round(items.reduce((sum, item) => sum + item.main.temp, 0) / items.length);
          const icon = items[0].weather[0].icon;

          return (
            <div key={date} className="forecast-card">
              <p>{day}</p>
              <img 
                src={`https://openweathermap.org/img/wn/${icon}.png`} 
                alt="Weather icon" 
              />
              <p>{avgTemp}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;