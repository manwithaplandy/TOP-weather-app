const cityInput = document.getElementById("city");
const btn = document.getElementById("submit");
const error = document.querySelector(".error");

async function getWeatherData(input) {
  let param;
  if (!city) {
    error.textContent = "Please enter a city";
  }
  if (parseInt(input)) {
    param = `zip=${input},us`;
  } else {
    param = `q=${input}`;
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${param}&APPID=a0d77661dd84ff173d88715f63cbd1b3&units=imperial`
    ).then(async (response) => {
      //   console.log(response);
      if (response.statusText === "Not Found") {
        error.textContent = "City not found";
      } else {
        const data = await response.json();
        const filtered = await processWeatherData(data);
        // console.log(filtered);
        refreshWeather(filtered);
      }
    });
  } catch (error) {
    error.textContent = "Something bad happened";
  }
}

async function processWeatherData(data) {
  return {
    temp: Math.round(data.main.temp),
    temp_min: Math.round(data.main.temp_min),
    temp_max: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    feels_like: Math.round(data.main.feels_like),
    city: data.name,
    weather: {
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      id: data.weather[0].id,
    },
  };
}

function refreshWeather(data) {
  //   const parent = document.querySelector(".cw-weather");
  const city = document.querySelector(".cw-city");
  city.textContent = `${data.city}`;
  const icon = document.querySelector(".cw-icon");
  icon.src = `http://openweathermap.org/img/w/${data.weather.icon}.png`;
  const weather = document.querySelector(".cw-weather-desc");
  weather.textContent = `${data.weather.description
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))}`;
  const temp = document.querySelector(".cw-temp");
  temp.textContent = `Current Temp: ${data.temp}°`;
  const mintemp = document.querySelector(".cw-mintemp");
  mintemp.textContent = `Low: ${data.temp_min}°`;
  const maxtemp = document.querySelector(".cw-maxtemp");
  maxtemp.textContent = `High: ${data.temp_max}°`;
  const humidity = document.querySelector(".cw-humidity");
  humidity.textContent = `Humidity: ${data.humidity}%`;
  const feelslike = document.querySelector(".cw-feelslike");
  feelslike.textContent = `Feels like: ${data.feels_like}°`;
}

btn.addEventListener("click", () => {
  error.textContent = "";
  getWeatherData(cityInput.value);
});

// Load default weather data
getWeatherData("San Diego");
