const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require("node-fetch");

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
  // let lat = await coordinates.lat;
  // let long = await coordinates.lng;
  let response = await fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${coords.lat},${coords.lng}?exclude=minutely,alerts,flags`);
  let forecast = await response.json();
  return forecast;
}

module.exports = {
  apiCoordinates: apiCoordinates,
  apiForecast: apiForecast
}
