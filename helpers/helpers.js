const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require("node-fetch");
const Forecast = require("../models/forecast");

async function apiCoordinates(location) {
  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_API_KEY}`);
  let data = await response.json();
  return data;
}

async function coordinates(location) {
  let data = await apiCoordinates(location);
  console.log(data)
  let coords = data.results[0].geometry.location;
  return coords;
}

async function apiForecast(location) {
  let coords = await coordinates(location);
  let response = await fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${coords.lat},${coords.lng}?exclude=minutely,alerts,flags`);
  let forecast = await response.json();
  return forecast;
}

async function formatForecast(location) {
  let forecast = await apiForecast(location);
  let formattedForecast = await new Forecast(location, forecast);
  return formattedForecast;
}


async function userByKey(apiKey) {
  return database.select("id").from("users").where("api_key", apiKey).first()
}

async function favLocations(apiKey) {
  let userId = await userByKey(apiKey);
  let favorites = await database("favorites").where("user_id", userId);
  const locations = await favorites.map(x => x.location);
  return locations;
}

async function fetchForecastFav(address) {
  let forecast = await fetchForecast(address);
  let currentForecast = await forecast.currently
  return currentForecast;
};

async function getFavForecasts(apiKey) {
  let locations = await favLocations(apiKey);
  let forecasts = await getForecasts(locations)
  console.log(forecasts)
  return forecasts;
}

module.exports = {
  apiCoordinates: apiCoordinates,
  apiForecast: apiForecast,
  formatForecast: formatForecast,
  userByKey: userByKey,
  favLocations: favLocations,
  getFavForecasts: getFavForecasts,
  fetchForecastFav: fetchForecastFav
}
