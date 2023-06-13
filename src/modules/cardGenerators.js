function appendContent(htmlCode, container) {
  container.innerHTML += htmlCode;
}

function convertDate (index, weatherData) {
  let dateString = weatherData.daily.time[index];
  let dateObject = new Date(dateString);
  let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  let dayOfWeek = days[dateObject.getDay()];
  let dayOfMonth = dateObject.getDate();
  return dayOfWeek + " " + dayOfMonth;
}

function roundNumberToOneDecimal (num) {
  return Math.round(num * 10) / 10;
}

function convertDailyPrecipitation(index, weatherData) {
  let precipitationNumber = weatherData.daily.precipitation_sum[index];
  let precipitation = roundNumberToOneDecimal(precipitationNumber);
  return precipitation + " in";
}

function convertDailyHighTempToFahrenheit (index, weatherData) {
  let temperatureNumber = weatherData.daily.temperature_2m_max[index];
  let tempHighInFahrenheit = Math.round(temperatureNumber);
  return tempHighInFahrenheit + " \u00B0F"
}

function convertDailyLowTempToFahrenheit (index, weatherData) {
  let temperatureNumber = weatherData.daily.temperature_2m_min[index];
  let tempLowInFahrenheit = Math.round(temperatureNumber);
  return tempLowInFahrenheit + " \u00B0F"
}

function convertWeatherInterpretationCode (index, weatherData) {
  let weatherInterpretationCode = weatherData.daily.weathercode[index];
  console.log("weatherInterpretationCode");
  let weatherCodes = {
    0: "Clear sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog and depositing rime fog",
    48: "Fog and depositing rime fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Light Freezing Drizzle",
    57: "Dense Freezing Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",
    71: "Slight Snowfall",
    73: "Moderate Snowfall",
    75: "Heavy Snowfall",
    77: "Snow Grains",
    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Violent Rain Showers",
    85: "Slight Snow Showers",
    86: "Heavy Snow Showers",
    95: "Slight Thunderstorm",
    96: "Thunderstorm with Slight Hail",
    99: "Thunderstorm with Heavy Hail"
  };
  let weatherInterpretation = weatherCodes[weatherInterpretationCode];
  return weatherInterpretation;
}

function createWeeklySummaryCard (index, weatherData) {
  let date = convertDate(index, weatherData);
  let precipitation = convertDailyPrecipitation(index, weatherData);
  let tempHighInFahrenheit = convertDailyHighTempToFahrenheit(index, weatherData);
  let tempLowInFahrenheit = convertDailyLowTempToFahrenheit(index, weatherData);
  let weatherInterpretation = convertWeatherInterpretationCode (index, weatherData);

  let htmlCode = 
    `<div class="bg-accent text-accent-content rounded flex flex-col items-center whitespace-nowrap">
      <div>${precipitation}</div>
      <div>${tempHighInFahrenheit}</div>
      <div>${weatherInterpretation}</div>
      <div>${tempLowInFahrenheit}</div>
      <div>${date}</div>
    </div>`;

  let container = document.getElementById("weekly-summary-container");

  appendContent(htmlCode, container);
}

export function createWeeklySummaryCards(weatherData) {
  console.log(`Intializing Weekly Summary Cards`);
  for (let i = 0; i < 7; i++) {
    let index = i;
      createWeeklySummaryCard(index, weatherData);
      console.log(`Card ${index}`);
  }
}