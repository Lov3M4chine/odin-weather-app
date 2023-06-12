import { fetchWeatherData } from './modules/weatherAPI';
import './styles.css';

let latitude = 39.61;
let longitude = -105.02;

fetchWeatherData(latitude, longitude);
