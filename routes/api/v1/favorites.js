var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);


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
      return response.status(401).json({ error: "Unauthorized: missing or invalid API key" });
    }
  });
});

// router.post('/', (request, response) => {
//   (async() => {
//     const favorite = request.body
//     const userId =
//   })
// });
// .insert is how you create favorites

module.exports = router;

// create setup folder for file setup stuff; import file
// if you're setting up services etc that get things called on it, leave those in your file
