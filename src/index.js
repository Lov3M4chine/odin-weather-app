import { addEventListenerToLocationSearch, displayLocationName,} from "./modules/eventListeners";
import {initializeWeatherData} from "./modules/cardGenerators.js";
import "./styles.css";
import { themeChange } from "theme-change";

let latitude = localStorage.getItem("latitude");
let longitude = localStorage.getItem("longitude");
let name = localStorage.getItem("name");
let country = localStorage.getItem("country");

themeChange();
initializeWeatherData(latitude, longitude);
displayLocationName(name, country);
addEventListenerToLocationSearch(initializeWeatherData);


