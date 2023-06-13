import { initializeWeeklySummaryCards } from './modules/cardGenerators.js';
import { initializeDailyCards } from './modules/cardGenerators.js';
import { initializeHourlyData } from './modules/cardGenerators.js';
import { fetchWeatherData } from './modules/weatherAPI.js';
import './styles.css';
import { themeChange } from 'theme-change';

themeChange()

let latitude = 39.61;
let longitude = -105.02;

fetchWeatherData(latitude, longitude)
    .then(weatherData => {
        initializeWeeklySummaryCards(weatherData);
        initializeDailyCards(weatherData);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });