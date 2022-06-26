let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[date.getDay()];
  let currentMinute = String(date.getMinutes()).padStart(2, "0");
  let currentHour = date.getHours();

  let formattedDate = `${currentDay} ${currentHour}:${currentMinute} `;

  return formattedDate;
}

let theTime = document.querySelector("h4");
theTime.innerHTML = formatDate(currentTime);

//search for city

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentLocation = document.querySelector("#city-location");
  currentLocation.innerHTML = `${searchInput.value}`;
  let apiKey = "9fa869b82f729f6b388e9602e181cb7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  console.log(searchInput);
  console.log(currentLocation);
  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (14 * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fahrenheitTemperature;
}
let now = new Date();

formatDate(now);

// my wrong initial code
//function showTemperature(response) {
// let temperature = Math.round(response.data.main.temp);
//console.log(temperature);
//console.log(response);
//let city = response.data.name;
//let message = `It is currently ${temperature} degrees in ${city}`;
//let h1 = document.querySelector("h1");
//h1.innerHTML = message;
//axios.get(apiUrl).then(showTemperature);

function displayWeather(response) {
  console.log(response.data);
  let weatherDiv = document.querySelector("#weather");
  //let iconElement = document.querySelector("#icon");
  //let temperatureElement = document.querySelector("#temperature");
  //let cityElement = document.querySelector("#city");
  //let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  //let dateElement = document.querySelector("#date");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let apiKey = "9fa869b82f729f6b388e9602e181cb7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${temperature.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  console.log(temperature);
  //console.log(iconElement);
  //console.log(descriptionElement);
  console.log(response.data.name);
  //celsiusTemperature = response.data.main.temp;
  //temperatureElement.innerHTML = Math.round(celsiusTemperature);
  //cityElement.innerHTML = response.data.name;
  //descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  //dateElement.innerHTML = formatDate(response.data.dt * 1000);
  weatherDiv.innerHTML = `It is ${temperature} degrees in ${city}`;
  axios.get(apiUrl).then(displayWeather);
}

function retrievePosition(position) {
  let apiKey = "9fa869b82f729f6b388e9602e181cb7f";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  //let units = "metric";
  //older option let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  console.log(latitude);
  console.log(longitude);
  axios.get(apiUrl).then(displayWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

//2nd try
//unit convertor
function convertF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = Math.round(temperature * 1.8 + 32);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertF);

function convertC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = Math.round((temperature * (14 * 9)) / 5 + 32);

  let celcius = document.querySelector("#celcius");
  celcius.addEventListener("click", convertC);

  //weather icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  //function showTemp(response) {
  //let temperature = Math.round(response.data.main.temp);
  //let todayTemp = document.querySelector("#today-temp");
  //todayTemp.innerHTML = `${temperature}°c`;
  //let city = document.querySelector("h1");
  //city.innerHTML = response.data.name;
  //console.log(response.data);
}
