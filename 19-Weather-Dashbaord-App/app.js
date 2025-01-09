const apiKey = "706e259ab8fb31a1827d3a6ef48c9845"; // Replace with your OpenWeatherMap API key
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found!");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p class="error">${error.message}</p>`;
  }
};

const displayWeather = (data) => {
  const { name, weather, main, wind } = data;
  weatherInfo.innerHTML = `
    <div class="weather-card">
      <h2>${name}</h2>
      <p><strong>Temperature:</strong> ${main.temp}°C</p>
      <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
      <p><strong>Weather:</strong> ${weather[0].description}</p>
      <p><strong>Humidity:</strong> ${main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">
    </div>
  `;
};

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeatherData(city);
  } else {
    weatherInfo.innerHTML = `<p class="error">Please enter a city name!</p>`;
  }
});

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});
