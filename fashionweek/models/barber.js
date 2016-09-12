const mongoose       = require("mongoose");
const oauthSignature = require('oauth-signature');
const nonce          = require('nonce')();
const request        = require('request');
const querystring    = require('querystring');
const lodash         = require('lodash');

const barberSchema = new mongoose.Schema({
  name:       { type: String, trim: true, required: true },
  lat:        { type: String, trim: true, required: true },
  lng:        { type: String, trim: true, required: true },
  postcode:   { type: String, trim: true, required: true },
  location:   { type: String, trim: true, required: true },
  website:    { type: String, trim: true, required: true },
  image:      { type: String, trim: true, required: true },
});

const requestYelp = (err, response, body, requiredParameters) => {

};

$.ajax({
  url: ("http://jsonplaceholder.typicode.com/posts"),
  method: "GET"
}).done(function(data){
  console.log(data);
}).fail(function(data){
  console.log("ERROR", data);
});

// request(apiURL, (err, response, body) => {
//   return callback(error, response, body);
// });

//
// const httpMethod        = "GET";
// const url               = "http://api.yelp.com/v2/search";
// const defaultParameters = {
//   location: 'London',
//   sort: '2'
// };
const requiredParameters = {
    oauth_consumer_key : process.env.oauth_consumer_key,
    oauth_token : process.env.oauth_token,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };

const parameters     = _.assign(defaultParameters, setParameters, requiredParameters);
const consumerSecret = process.env.consumerSecret;
const tokenSecret    = process.env.tokenSecret;
const signature      = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false });

parameters.oauth_signature = signature;
const paramURL = qs.stringify(parameters);
const apiURL = url+'?'+paramURL;


module.exports = mongoose.model("Barber", barberSchema);
