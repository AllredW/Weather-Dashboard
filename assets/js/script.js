const searchButton = document.getElementById("search-button");
// utilizes Geocoding API to reference cities matching the text in the search input, including latitude and longitude

// check localStorage for stored city names, or creates new array to store new data
const searchData = JSON.parse(localStorage.getItem("searchResults")) || [];
// container for main body weather results
const container = document.getElementById("container");
// container for search history sidebar
const history = document.getElementById("history");

function fetchCity(data) {
  const city = document.getElementById("form1").value.trim();
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=449e0f70c68d023360a6656f43c00e19`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert("Location not found");
      } else {
        fetchWeather(data[0]);
        storeData(city);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}
// extracts the latitude/longitude properties from the "city" data above, and uses the openWeather API to check weather conditions in the target city
function fetchWeather(searchedCity) {
  const { lat } = searchedCity;
  const { lon } = searchedCity;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=449e0f70c68d023360a6656f43c00e19`;

  fetch(weatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data) {
        alert("openWeather API is not functioning properly");
      } else {
      }
      renderCurrentWeather(searchedCity, data);
    })
    .catch(function (err) {
      console.error(err);
    });
  createHistory();
}

// stingifies data and pushes to localStorage, adds search data to Recent Searches
// take city from search form, as string,
function storeData(searchCity) {
  searchData.push(searchCity);
  // stringify/push searchData array into localStorage
  localStorage.setItem("searchResults", JSON.stringify(searchData));
}

// create Recent Searches button with link to cities in localStorage
function createHistory() {
  searchData.forEach((city) => {
    // create <button> element for each city in history
    const recentSearches = document.getElementById("history");
    const cityBtn = document.createElement("button");
    cityBtn.classList.add("btn-btn-light", "city-button");
    cityBtn.textContent = city;
    // append buttons to #history
    history.append(cityBtn);
  });
}
// if button in Recent Searches is clicked, moves the relevant data array to the front of the searchData array

// recall/display relevant data from most recent search (date, weather conditions, temperature, humidity, wind speed)
function renderCurrentWeather(city, weather) {
 container.textContent = '';
  // Pull relevant data values from array
  const cityName = weather.city.name;
  const date = weather.list[0].dt_txt;
  const temp = weather.list[0].main.temp;
  const wind = weather.list[0].wind.speed;
  const humid = weather.list[0].main.humidity;
  const icon = weather.list[0].weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
  // create containers for data in HTML

  const cityH1 = document.createElement("h1");
  const dateH1 = document.createElement("h1");
  const tempH1 = document.createElement("h1");
  const windH1 = document.createElement("h1");
  const humidH1 = document.createElement("h1");
  const iconImg = document.createElement("img");
  // assign elements with weather data
  cityH1.textContent = cityName;
  dateH1.textContent = date;
  tempH1.textContent = temp;
  windH1.textContent = wind;
  humidH1.textContent = humid;
  iconImg.setAttribute("src", iconUrl);
  // append to #container in HTML
  container.append(cityH1, dateH1, tempH1, windH1, humidH1, iconImg);
}

// 5 day forecast

// recall saved search
function weatherRecall(e) {
  if (!e.target.matches('.city-button')) {
    return;
  }
 const target = e.target;
 const cityName = target.textContent;
fetchCity(cityName);
}


searchButton.addEventListener('click', fetchCity);
// searchHistoryContainer.addEventListener("click", cityRecall)
history.addEventListener('click', weatherRecall);