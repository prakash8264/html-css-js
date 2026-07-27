// Select HTML elements
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const cityDisplay = document.querySelector(".cityDisplay");
const tempDisplay = document.querySelector(".tempDisplay");
const humidityDisplay = document.querySelector(".humidityDisplay");
const descDisplay = document.querySelector(".descDisplay");
const weatherEmoji = document.querySelector(".weatherEmoji");
const errorDisplay = document.querySelector(".errorDisplay");

// Hide card initially on page load
card.style.display = "none";

// Simple lookup object for weather codes, descriptions, and emojis
const weatherMap = {
  0: { description: "Clear Sky", emoji: "☀️" },
  1: { description: "Mainly Clear", emoji: "🌤️" },
  2: { description: "Partly Cloudy", emoji: "⛅" },
  3: { description: "Overcast", emoji: "☁️" },
  45: { description: "Fog", emoji: "🌫️" },
  51: { description: "Light Drizzle", emoji: "🌦️" },
  61: { description: "Rain", emoji: "🌧️" },
  71: { description: "Snow", emoji: "❄️" },
  95: { description: "Thunderstorm", emoji: "⛈️" }
};

// Event listener for form submission
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  // Show error if input is empty
  if (!city) {
    showError("Please enter a city");
    return;
  }

  try {
    // 1. Fetch city coordinates using Open-Meteo Geocoding API
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    // Show error if city is not found
    if (!geoData.results || geoData.results.length === 0) {
      showError("City not found");
      return;
    }

    const location = geoData.results[0];

    // 2. Fetch weather using latitude & longitude from Open-Meteo Weather API
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    // Display weather data
    displayWeather(location.name, weatherData.current);

  } catch (error) {
    showError("Could not fetch weather data");
  }
});

// Display weather details inside card
function displayWeather(cityName, currentData) {
  card.style.display = "flex";
  errorDisplay.style.display = "none";

  // Lookup weather info or fallback to unknown
  const weatherInfo = weatherMap[currentData.weather_code] || { description: "Unknown Weather", emoji: "❓" };

  cityDisplay.textContent = cityName;
  tempDisplay.textContent = `${currentData.temperature_2m}°C`;
  humidityDisplay.textContent = `Humidity: ${currentData.relative_humidity_2m}%`;
  descDisplay.textContent = weatherInfo.description;
  weatherEmoji.textContent = weatherInfo.emoji;

  cityDisplay.style.display = "block";
  tempDisplay.style.display = "block";
  humidityDisplay.style.display = "block";
  descDisplay.style.display = "block";
  weatherEmoji.style.display = "block";
}

// Display error message inside card
function showError(message) {
  card.style.display = "flex";

  cityDisplay.style.display = "none";
  tempDisplay.style.display = "none";
  humidityDisplay.style.display = "none";
  descDisplay.style.display = "none";
  weatherEmoji.style.display = "none";

  errorDisplay.textContent = message;
  errorDisplay.style.display = "block";
}
