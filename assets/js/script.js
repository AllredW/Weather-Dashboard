// Server-side API: Geo-coding API, converts cities in search input to latitude/longitude coordinates
const geoCode = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={449e0f70c68d023360a6656f43c00e19}';
// Server-side API: requesting data from OpenWeather
const openWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={449e0f70c68d023360a6656f43c00e19}';