var express = require('express');
var router = express.Router();
var forecastObject = require('../../../models/forecast.js');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');

const helpers = require('../../../helpers/helpers');
const formattedForecast = helpers.formatForecast;

router.get('/', (request, response) => {
  const userApiKey = request.body.api_key;
  database("users").where("api_key", userApiKey)
    .then(user => {
      if (user[0]) {
        formattedForecast(request.query.location)
          .then(forecast => response.status(200).send(forecast))
      } else {
        response.status(401).json({
          error: "Unauthorized: missing or invalid API key"});
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});


module.exports = router
