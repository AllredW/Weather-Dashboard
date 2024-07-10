const searchButton = document.getElementById("search-button");
// utilizes Geocoding API to reference cities matching the text in the search input, including latitude and longitude

// check localStorage for stored city names, or creates new array to store new data
const searchData = localStorage.getItem("searchResults") || [];

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
    storeData(city);
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

};

// stingifies data and pushes to localStorage, adds search data to Recent Searches
// take city from search form, as string, 
function storeData(searchCity) {
  // check for data
 console.log(searchCity);
 console.log(searchData);
    // parse data from string
    searchData.push(searchCity);
  // stringify/push searchData array into localStorage
localStorage.setItem("searchResults", JSON.stringify(searchData));
};

searchButton.addEventListener("click", fetchCity);