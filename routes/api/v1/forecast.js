var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');

const helpers = require('../../../helpers/helpers');
const fetchForecast = helpers.fetchForecast;
// .where('user_id', getUser(request.body.api_key)).where('location', request.body.location)
router.get('/', (request, response) => {
  database('users').where('api_key', request.body.api_key)
    .then(users => {
      if (users.length) {
        fetchForecast(request.query)
          .then(data => response.status(200).send(data))
          .catch(reason => response.send(reason.message))
      } else {
        response.status(401).json({error: "Unauthorized: missing or invalid API key"});
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// Could create const all = () => database('papers')
//   .select()
module.exports = router
