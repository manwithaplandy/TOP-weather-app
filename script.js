const cityInput = document.getElementById("city");
const btn = document.getElementById("submit");

async function getWeatherData(city) {
  if (!city) {
    city = "San Diego";
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a0d77661dd84ff173d88715f63cbd1b3&units=imperial`
    );
    const data = await response.json();
    const filtered = await processWeatherData(data);
    console.log(filtered);
    refreshWeather(filtered);
  } catch (error) {
    console.log(error);
  }
}

async function processWeatherData(data) {
  return {
    temp: data.main.temp,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    humidity: data.main.humidity,
    feels_like: data.main.feels_like,
    city: data.name,
    weather: {
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    },
  };
}

function refreshWeather(data) {
  const parent = document.querySelector(".weather");
  const city = document.createElement("h1");
  city.textContent = data.city;
  const icon = document.createElement("img");
  icon.src = `http://openweathermap.org/img/w/${data.weather.icon}.png`;
  const weather = document.createElement("h2");
  weather.textContent = `${data.weather.description}`;
  const temp = document.createElement("p");
  temp.textContent = `Current Temp: ${data.temp}°`;
  const mintemp = document.createElement("p");
  mintemp.textContent = `Low: ${data.temp_min}°`;
  const maxtemp = document.createElement("p");
  maxtemp.textContent = `High: ${data.temp_max}°`;
  const humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${data.humidity}`;
  const feelslike = document.createElement("p");
  feelslike.textContent = `Feels like: ${data.feels_like}°`;
  parent.append(
    city,
    icon,
    weather,
    temp,
    mintemp,
    maxtemp,
    humidity,
    feelslike
  );
}

btn.addEventListener("click", () => getWeatherData(cityInput.value));
