export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "",// enter your rapid api key here
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
// export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const GEO_API_URL = "https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}";

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "678a374eefbdfaf6c0ebe139725629f2"; // enter your key from openweather API
