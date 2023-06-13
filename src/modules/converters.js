function convertWeeklyDates(index, weatherData) {
  let dateString = weatherData.daily.time[index];
  let dateObject = new Date(dateString);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let dayOfWeek = days[dateObject.getDay()];
  let dayOfMonth = dateObject.getDate();
  return dayOfWeek + " " + dayOfMonth;
}

function roundNumberToOneDecimal(num) {
  return Math.round(num * 10) / 10;
}

function convertPrecipitation(index, weatherData, precipitationType) {
  let precipitationNumber;
  if (precipitationType === "daily") {
    precipitationNumber = weatherData.daily.precipitation_sum[index];
  } else if (precipitationType === "hourly") {
    precipitationNumber = weatherData.hourly.precipitation[index];
  } else {
    throw new Error("Need valid precipitationType ('daily', 'hourly', etc.)");
  }
  let precipitation = roundNumberToOneDecimal(precipitationNumber);
  return precipitation + " in";
}

function convertTempToFahrenheit(index, weatherData, temperatureType) {
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
    throw new Error("Need temperature type when converting");
  }
  let tempRoundedInFahrenheit = Math.round(temperatureNumber);
  return tempRoundedInFahrenheit + " \u00B0F";
}

function convertWeatherInterpretationCode(index, weatherData, isDaily) {
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
    99: "Thunderstorm with Heavy Hail",
  };
  let weatherInterpretation = weatherCodes[weatherInterpretationCode];
  return weatherInterpretation;
}

function convertDailyDates(index, weatherData) {
  let dateString = weatherData.hourly.time[index];
  let dateObject = new Date(dateString);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let dayOfWeek = days[dateObject.getDay()];
  let dayOfMonth = dateObject.getDate();
  return dayOfWeek + " " + dayOfMonth;
}

function convertTime(index) {
  let hours = index % 24;
  let adjustToTwelveHourFormat = hours % 12 || 12;
  let ampm = hours < 12 || hours === 24 ? "AM" : "PM";
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

function convertWindSpeed(index, weatherData) {
  let windSpeedNumber = weatherData.hourly.windspeed_10m[index];
  let windSpeedRounded = Math.round(windSpeedNumber);
  return windSpeedRounded + "mph";
}

export {
  convertWeeklyDates,
  convertPrecipitation,
  convertTempToFahrenheit,
  convertWeatherInterpretationCode,
  convertDailyDates,
  convertTime,
  convertWindDirection,
  convertWindSpeed,
};
