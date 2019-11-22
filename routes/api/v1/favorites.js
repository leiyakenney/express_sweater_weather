var express = require('express');
var router = express.Router();
var forecastObject = require('../../../models/forecast.js');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const helpers = require('../../../helpers/helpers');
const formattedForecast = helpers.formatForecast;
const findUser = helpers.userByKey;

router.get('/', (request, response) => {
  const userApiKey = request.body.api_key;
  database("users").where("api_key", userApiKey)
    .then(user => {
      if (user[0]) {
        database("favorites").select()
          .then(res => response.status(200).json(res))
          .catch(error => {response.status(500).json({ error });
        })
        .catch(error => {response.status(500).json({ error });
      });
    } else {
      return response.status(401).json({ error: "Unauthorized: invalid or missing API Key" });
    }
  });
});

router.post('/', (request, response) => {
  (async () => {
   const favorite = request.body
   const userId = await helpers.userByKey(favorite.api_key).then(function (result) { return result })

   if (userId) {
     for (const requiredParameter of ['location', 'api_key']) {
       if (!favorite[requiredParameter]) {
         return response
           .status(422)
           .send({ error: `Expected format: { location: <STRING>, api_key: <STRING}. You're missing a "${requiredParameter}" property.` })
       }
     }

     database('favorites').insert({ location: await favorite.location, user_id: await userId.id })
       .then(like => {
         response.status(200).json({ message: `${favorite.location} has been added to your favorites` })
       })
       .catch(error => {
         response.status(500).json({ error })
       })
   } else {
     response.status(401).send({ error: 'Unauthorized: incorrect or missing API key' })
   }
 })()
});

router.delete("/", (request, response) => {
  const favorite = request.body;
  const userApiKey = favorite.api_key;
  const location = favorite.location;
  for (let requiredParameter of ["api_key", "location"]) {
    if (!favorite[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { api_key: <String>, location: <String> }. You're missing a "${requiredParameter}" property.`
      });
    }
  }
  database("users").where("api_key", userApiKey)
    .then(user => {
      if (user[0]) {
        database("favorites").where("location", location)
          .then(favorite => {
            if (favorite[0]) {
              database("favorites").del().where({ user_id: user[0].id, location: location })
                .then(favorite => {
                  response.status(200).json({ message: `${location} has been removed from your favorites`});
                })
                .catch(error => {response.status(500).json({ error });
                });
            } else {
              return response.status(400).json({ message: `${location} is not in your favorites` });
            }
          });
      } else {
        return response.status(401).json({ error: "Unauthorized: invalid or missing API key" });
      }
    });
});

module.exports = router;
