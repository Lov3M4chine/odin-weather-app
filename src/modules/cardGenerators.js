function appendContent(htmlCode, container) {
  container.innerHTML += htmlCode;
}

function convertWeeklyDates (index, weatherData) {
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

function convertPrecipitation(index, weatherData, precipitationType) {
  let precipitationNumber;
  if (precipitationType === "daily") {
    precipitationNumber = weatherData.daily.precipitation_sum[index];
  } else if (precipitationType === "hourly") {
    precipitationNumber = weatherData.hourly.precipitation[index];
  } else {
    throw new Error ("Need valid precipitationType ('daily', 'hourly', etc.)");
  }
  let precipitation = roundNumberToOneDecimal(precipitationNumber);
  return precipitation + " in";
}

function convertTempToFahrenheit (index, weatherData, temperatureType) {
  let temperatureNumber;
  if (temperatureType === "high") {
    temperatureNumber = weatherData.daily.temperature_2m_max[index];
  } else if (temperatureType === "low") {
    temperatureNumber = weatherData.hourly.apparent_temperature[index];
  } else if (temperatureType === "apparent") {
    temperatureNumber = weatherData.hourly.apparent_temperature[index];
  } else if (temperatureType === "hourly") {
    temperatureNumber = weatherData.hourly.temperature_2m[index];
  } else {
    throw new Error ("Need temperature type when converting");
  }
  let tempRoundedInFahrenheit = Math.round(temperatureNumber);
  return tempRoundedInFahrenheit + " \u00B0F"
}

function convertWeatherInterpretationCode (index, weatherData, isDaily) {
  let weatherInterpretationCode;
  if (isDaily) {
    weatherInterpretationCode = weatherData.daily.weathercode[index];
  } else {
    weatherInterpretationCode = weatherData.hourly.weathercode[index];
  }
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
  let isDaily = true;
  let date = convertWeeklyDates(index, weatherData);
  let precipitation = convertPrecipitation(index, weatherData, "daily");
  let tempHighInFahrenheit = convertTempToFahrenheit(index, weatherData, "high");
  let tempLowInFahrenheit = convertTempToFahrenheit(index, weatherData, "low");
  let weatherInterpretation = convertWeatherInterpretationCode (index, weatherData, isDaily);

  let htmlCode = 
    `<div class="bg-accent-focus text-accent-content rounded flex flex-col items-center whitespace-nowrap w-full">
      <div>${precipitation}</div>
      <div>${tempHighInFahrenheit}</div>
      <div>${weatherInterpretation}</div>
      <div>${tempLowInFahrenheit}</div>
      <div>${date}</div>
    </div>`;

  let container = document.getElementById("weekly-summary-container");

  appendContent(htmlCode, container);
}

export function initializeWeeklySummaryCards(weatherData) {
  for (let i = 0; i < 7; i++) {
    let index = i;
      createWeeklySummaryCard(index, weatherData);
  }
}

function convertDailyDates (index, weatherData) {
  let dateString = weatherData.hourly.time[index];
  let dateObject = new Date(dateString);
  let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  let dayOfWeek = days[dateObject.getDay()];
  let dayOfMonth = dateObject.getDate();
  return dayOfWeek + " " + dayOfMonth;
}

function convertTime(index) {
  let hours = index % 24;
  let adjustToTwelveHourFormat = hours % 12 || 12;
  let ampm = hours < 12 || hours === 24 ? 'AM' : 'PM';
  return `${adjustToTwelveHourFormat}${ampm}`;
}

function convertWindDirection(index, weatherData) {
  let windDirection;
  let directionNumber = weatherData.hourly.winddirection_10m[index];

  if (directionNumber < 45) {
    windDirection = "NW";
  } else if (directionNumber < 90) {
    windDirection = "N";
  } else if (directionNumber < 135) {
    windDirection = "NE";
  } else if (directionNumber < 180) {
    windDirection = "E";
  } else if (directionNumber < 225) {
    windDirection = "SE";
  } else if (directionNumber < 270) {
    windDirection = "S";
  } else if (directionNumber < 315) {
    windDirection = "SW";
  } else {
    windDirection = "W";
  }

  return windDirection;
}

function convertWindSpeed (index, weatherData) {
  let windSpeedNumber = weatherData.hourly.windspeed_10m[index];
  let windSpeedRounded = Math.round(windSpeedNumber);
  return windSpeedRounded + "mph";
}


function createDailyCard(index, weatherData) {
  let isDaily = false;
  let date = convertDailyDates(index, weatherData);
  let weatherInterpretation = convertWeatherInterpretationCode(index, weatherData, isDaily);
  let apparentTemperatureInFarenheit = convertTempToFahrenheit(index, weatherData, "apparent");

  let htmlCode =
    `<div>
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
  let weatherInterpretation = convertWeatherInterpretationCode(hourlyIndex, weatherData, isDaily);
  let hourlyTemp = convertTempToFahrenheit(hourlyIndex, weatherData, "hourly");
  let precipitation = convertPrecipitation(hourlyIndex, weatherData, "hourly");
  let windDirection = convertWindDirection(hourlyIndex, weatherData);
  let windSpeed = convertWindSpeed(hourlyIndex, weatherData);

  let htmlCode =
    `<div class="hourly-data flex justify-between bg-neutral text-neutral-content">
      <div class="flex gap-3">
        <div>${time}</div>
        <div>${weatherInterpretation}</div>
        <div>${hourlyTemp}</div>
      </div>
      <div class="flex gap-3">
        <div>${precipitation}</div>
        <div>${windSpeed}</div>
        <div>${windDirection}</div>
      </div>
    </div>`;

  let container = document.getElementById(`hourly-container-${index}`);
  appendContent(htmlCode, container);
}

export function initializeDailyCards(weatherData) {
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
