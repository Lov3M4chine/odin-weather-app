import { fetchGeolocation } from "./geolocationAPI";

export function displayLocationName(name, country) {
  const locationName = document.getElementById("location-name");
  locationName.innerText = name + ", " + country;
  if (name === null || country === null) {
    locationName.innerText = "Please select a location."
    }
}

export function addEventListenerToLocationSearch(initialzeWeatherData) {
  document.addEventListener("DOMContentLoaded", function () {
    const locationButton = document.getElementById("locationButton");
    const locationInput = document.getElementById("locationInput");
    const locationDropdown = document.getElementById("locationDropdown");

    locationButton.addEventListener("click", function () {
      this.style.display = "none";
      locationInput.style.display = "";
    });

    locationInput.addEventListener("keyup", async function () {
      const userInput = this.value;

      if (userInput.length > 2) {
        try {
          const data = await fetchGeolocation(userInput);

          locationDropdown.innerHTML = "";
          locationDropdown.style.display = "";

          data.results.forEach(function (item) {
            const buttonElement = document.createElement("button");
            buttonElement.className = "btn btn-border search-result";
            buttonElement.textContent = item.name + ", " + item.country;
            buttonElement.dataset.latitude = item.latitude;
            buttonElement.dataset.longitude = item.longitude;
            buttonElement.dataset.name = item.name;
            buttonElement.dataset.country = item.country;

            locationDropdown.appendChild(buttonElement);
          });
        } catch (err) {
          console.error(err);
        }
      }
    });

    locationDropdown.addEventListener("click", function (event) {
      if (event.target.classList.contains("search-result")) {
        const latitude = event.target.dataset.latitude;
        const longitude = event.target.dataset.longitude;
        console.log(
          "User selected location with latitude: " +
            latitude +
            ", longitude: " +
            longitude
        );

        locationInput.style.display = "none";
        locationInput.value = "";
        locationDropdown.style.display = "none";
        locationButton.style.display = "";

        let name = event.target.dataset.name;
        let country = event.target.dataset.country;

        displayLocationName(name, country);

        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
        localStorage.setItem("name", name);
        localStorage.setItem("country", country);

        initialzeWeatherData(latitude, longitude);
      }
    });
  });
}
