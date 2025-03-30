// src/components/Forecast.jsx
import { useEffect, useState } from 'react';
import { useWeather } from '../context/WeatherContext';

export const Forecast = () => {
  const { weatherData } = useWeather();
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!weatherData) return;
    
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error('Forecast data unavailable');
        const data = await response.json();
        
        // Group by day
        const dailyForecast = data.list.reduce((acc, item) => {
          const date = item.dt_txt.split(' ')[0];
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        }, {});
        
        setForecast(Object.entries(dailyForecast).slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchForecast();
  }, [weatherData]);

  if (!weatherData) return null;
  
  if (loading) {
    return <div className="text-center py-4">Loading forecast...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }
  
  if (!forecast) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-4">
      <h3 className="font-semibold text-lg mb-3 dark:text-white">5-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.map(([date, items]) => {
          const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
          const avgTemp = Math.round(items.reduce((sum, item) => sum + item.main.temp, 0) / items.length);
          const icon = items[Math.floor(items.length / 2)].weather[0].icon;
          
          return (
            <div key={date} className="flex items-center justify-between">
              <span className="dark:text-white">{day}</span>
              <img 
                src={`https://openweathermap.org/img/wn/${icon}.png`} 
                alt="weather icon" 
                className="w-8 h-8"
              />
              <span className="font-medium dark:text-white">{avgTemp}°C</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};