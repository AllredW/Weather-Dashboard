const searchButton = document.getElementById("search-button");

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
        // appendToHistory(city);
        fetchWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
};

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
        alert('Error');
      } else {
        // appendToHistory(city);
        console.log(data);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
};
searchButton.addEventListener("click", fetchCity);