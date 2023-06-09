export async function fetchWeatherData(latitude, longitude) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,cloudcover,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=ms&precipitation_unit=inch&forecast_days=14&timezone=auto`);
        if (response.ok) {
            const weatherData = await response.json();
            console.log(weatherData);
            return weatherData;
        } else {
            throw new Error(`Weather data request failed`);
        }
    } catch (error) {
        console.log(`Error fetching weather data`, error);
    }
}