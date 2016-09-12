const express       = require("express");
const morgan        = require("morgan");
const bodyParser    = require ("body-parser");
const mongoose      = require("mongoose");
const bcrypt        = require("bcrypt");
const cors          = require("cors");
const validator     = require("validator");
const expressJWT    = require("express-jwt");
const jsonWebToken  = require("jsonwebtoken");
const oauthSignature = require('oauth-signature');
const nonce          = require('nonce')();
const request        = require('request');
const querystring    = require('querystring');
const lodash         = require('lodash');


const app     = express();
const config  = require("./config/config");
const router  = require("./config/routes");

mongoose.connect(config.db);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.use("/api", expressJWT ({ secret: config.secret })
  .unless({
    path: [
      { url: "/api/register", method: ["POST"] },
      { url: "/api/login", method: ["POST"] },
    ]
  }));
  app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next) {
  if (err.name !== "UnauthorizedError") return next();
  return res.status(401).json({ message: "Unauthorized Request" });
}


app.use("/", router);

app.listen(config.port, () => console.log (`Express started on port: ${config.port}`));
