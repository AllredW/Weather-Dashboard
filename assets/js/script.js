const searchButton = document.getElementById("search-button");
// utilizes Geocoding API to reference cities matching the text in the search input, including latitude and longitude
function fetchCity(data) {
    const city = document.getElementById("form1").value;
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=449e0f70c68d023360a6656f43c00e19`;

    fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert('Location not found');
      } else {
        fetchWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
};
// extracts the latitude/longitude properties from the "city" data above, and uses the openWeather API to check weather conditions in the target city
function fetchWeather(searchedCity) {
console.log(searchedCity);

const {lat} = searchedCity;
const {lon} = searchedCity;
console.log(lat,lon);

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=449e0f70c68d023360a6656f43c00e19`;

fetch(weatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data) {
        alert('openWeather API is not functioning properly');
      } else {
        console.log(data);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
    storeData(data);
};

// storage array
const searchData = [];
// stingifies data and pushes to localStorage, adds search data to Recent Searches
function storeData(data) {
const searchData = localStore();

searchData.push(data);

const stringArray = JSON.stringify(searchData);
localStorage.setItem('searchData', stringArray);
console.log(searchData);
};

const localStore = function () {
  const storeData = localStorage.getItem("searchData");
  if (storeData) {
    // parse data from string
    const parseArray = JSON.parse(storeData);

    // display parseArray on page
    return parseArray;
  } else {
    return [];
  }
};

searchButton.addEventListener("click", fetchCity);