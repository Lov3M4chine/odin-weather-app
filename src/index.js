import { createWeeklySummaryCards } from './modules/cardGenerators';
import { fetchWeatherData } from './modules/weatherAPI';
import './styles.css';
import { themeChange } from 'theme-change';

themeChange()

let latitude = 39.61;
let longitude = -105.02;

fetchWeatherData(latitude, longitude)
    .then(weatherData => {
        let temperature = weatherData.current_weather.temperature;
        console.log(`temperature: ${temperature}`);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });

createWeeklySummaryCards();