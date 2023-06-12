import { fetchWeatherData } from './modules/weatherAPI';
import './styles.css';

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