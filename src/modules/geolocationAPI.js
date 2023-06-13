export async function fetchGeolocation(input) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    input
  )}&count=3&format=json`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return data;
      }
    }

    throw new Error("Failed to fetch coordinates from user input.");
  } catch (error) {
    throw new Error("An error occurred while fetching coordinates.");
  }
}
