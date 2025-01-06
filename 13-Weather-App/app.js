const apiKey = "706e259ab8fb31a1827d3a6ef48c9845"; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById("weatherInfo");
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");

// Function to fetch weather data
async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}

// Function to display weather data
function displayWeather(data) {
  const { name } = data;
  const { temp } = data.main;
  const { description, icon } = data.weather[0];
  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${temp}°C</p>
    <p>${description}</p>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
  `;
}

// Event listener for search button
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    weatherInfo.innerHTML = `<p class="error">Please enter a city name.</p>`;
  }
});
