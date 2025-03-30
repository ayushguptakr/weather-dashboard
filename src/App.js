import { WeatherProvider } from './context/WeatherContext';
import { SearchBar } from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import ThemeToggle from './components/ThemeToggle';
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
          <WeatherCard />
          <Forecast />
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;