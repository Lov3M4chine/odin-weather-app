import {
  convertWeeklyDates,
  convertPrecipitation,
  convertTempToFahrenheit,
  convertWeatherInterpretationCode,
  convertDailyDates,
  convertTime,
  convertWindDirection,
  convertWindSpeed,
} from "./converters";

import {fetchWeatherData} from "./weatherAPI";

function appendContent(htmlCode, container) {
  container.innerHTML += htmlCode;
}

function createWeeklySummaryCard(index, weatherData) {
  let isDaily = true;
  let date = convertWeeklyDates(index, weatherData);
  let precipitation = convertPrecipitation(index, weatherData, "daily");
  let tempHighInFahrenheit = convertTempToFahrenheit(
    index,
    weatherData,
    "high"
  );
  let tempLowInFahrenheit = convertTempToFahrenheit(index, weatherData, "low");
  let weatherInterpretation = convertWeatherInterpretationCode(
    index,
    weatherData,
    isDaily
  );

  let htmlCode = `<div class="bg-accent-focus text-accent-content rounded flex flex-col text-center items-center w-screen justify-between">
      <div>${precipitation}</div>
      <div>${tempHighInFahrenheit}</div>
      <div>${weatherInterpretation}</div>
      <div>${tempLowInFahrenheit}</div>
      <div class="w-full text-center border border-4 border-neutral">${date}</div>
    </div>`;

  let container = document.getElementById("weekly-summary-container");

  appendContent(htmlCode, container);
}

export function initializeWeeklySummaryCards(weatherData) {
  let container = document.getElementById("weekly-summary-container");
  container.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    let index = i;
    createWeeklySummaryCard(index, weatherData);
  }
}

function createDailyCard(index, weatherData) {
  let isDaily = false;
  let date = convertDailyDates(index, weatherData);
  let weatherInterpretation = convertWeatherInterpretationCode(
    index,
    weatherData,
    isDaily
  );
  let apparentTemperatureInFarenheit = convertTempToFahrenheit(
    index,
    weatherData,
    "apparent"
  );

  let htmlCode = `<div>
      <div class="flex justify-between bg-primary text-primary-content rounded">
        <div class="flex flex-col gap-1">
          <div class="">${date}</div>
          <div>${weatherInterpretation}</div>
        </div>
        <div class="flex flex-col gap-1">
          <div>Feels Like</div>
          <div class="text-center">${apparentTemperatureInFarenheit}</div>
        </div>
      </div>
      <div id="hourly-container-${index}" class="rounded"></div>
    </div>`;

  let container = document.getElementById("daily-cards-container");
  appendContent(htmlCode, container);
}

function createHourlyData(hourlyIndex, weatherData, index) {
  let isDaily = false;
  let time = convertTime(hourlyIndex);
  let weatherInterpretation = convertWeatherInterpretationCode(
    hourlyIndex,
    weatherData,
    isDaily
  );
  let hourlyTemp = convertTempToFahrenheit(hourlyIndex, weatherData, "hourly");
  let precipitation = convertPrecipitation(hourlyIndex, weatherData, "hourly");
  let windDirection = convertWindDirection(hourlyIndex, weatherData);
  let windSpeed = convertWindSpeed(hourlyIndex, weatherData);

  let htmlCode = 
  `<div class="hourly-data grid grid-cols-6 gap-3 bg-neutral text-neutral-content">
    <div>${time}</div>
    <div>${weatherInterpretation}</div>
    <div>${hourlyTemp}</div>
    <div>${precipitation}</div>
    <div>${windSpeed}</div>
    <div>${windDirection}</div>
  </div>`;

  let container = document.getElementById(`hourly-container-${index}`);
  appendContent(htmlCode, container);
}

export function initializeDailyCards(weatherData) {
  let container = document.getElementById("daily-cards-container");
  container.innerHTML = "";
  console.log(`Initializing Daily Summary Cards`);
  for (let i = 0; i < weatherData.hourly.time.length; i += 24) {
    let index = i;
    createDailyCard(index, weatherData);
    console.log("Daily Card Created");

    for (let j = index; j < index + 24; j += 4) {
      let hourlyIndex = j;
      createHourlyData(hourlyIndex, weatherData, index);
      console.log("Hourly Data Created");
    }
  }
}

export function initializeWeatherData(latitude, longitude) {
  fetchWeatherData(latitude, longitude)
    .then((weatherData) => {
      initializeWeeklySummaryCards(weatherData);
      initializeDailyCards(weatherData);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
