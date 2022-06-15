async function getWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a0d77661dd84ff173d88715f63cbd1b3&units=imperial`
  );
  const data = await response.json();
  const filtered = await processWeatherData(data);
  console.log(filtered);
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
