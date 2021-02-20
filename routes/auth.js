var express = require('express');
var router = express.Router();
let axios = require('axios');
let btoa = require('btoa');

let consumerKey = process.env.CONSUMER_KEY;

let consumerSecret = process.env.CONSUMER_SECRET;

let host="127.0.0.1";

let authHeader = "Basic " + btoa(encodeURI(consumerKey) + ":" + encodeURI(consumerSecret));

let tokenURL = `http://${host}:${process.env.PORT}/v1/oauth2/token`;
const server = `https://session.voxeet.com`;

let requests = {
  token: {
    method: "POST",
    url: `${server}/v1/oauth2/token`,
    headers: {
      'Authorization': authHeader
    },
    data: {
      grant_type: 'client_credentials'
    }
  }
}

/* GET Token */
router.get('/token', function(req, res, next) {
  return axios(requests.token).then( r => {
    return res.json(r.data);
  }).catch(e => {
        console.error('Could not get token', requests.token, e.message/*, e*/);
        res.status(401).send('invalid token...');
  })
});

module.exports = router;
