import { WeatherProvider } from './context/WeatherContext';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { SearchHistory } from './components/SearchHistory';
import { ThemeToggle } from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <WeatherProvider>
      <div className="app-container">
        <div className="app-content">
          <div className="app-header">
            <h1>Weather Dashboard</h1>
            <ThemeToggle />
          </div>
          
          <SearchBar />
          <div className="weather-container">
            <div className="main-weather">
              <WeatherCard />
            </div>
            <div className="sidebar">
              <SearchHistory />
              {/* Bonus: Add Forecast component here */}
            </div>
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;