const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require("node-fetch");

async function apiCoordinates(location) {
  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_API_KEY}`);
  let data = await response.json();
  return data.results[0].geometry.location;
}

async function apiForecast(coordinates) {
  let lat = coordinates.lat
  let long = coordinates.lng
  let response = await fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${long}?exclude=minutely,alerts,flags`);
  let forecast = await response.json();
  return forecast;
}

module.exports = {
  apiCoordinates: apiCoordinates,
  apiForecast: apiForecast
}
