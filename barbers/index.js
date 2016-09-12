const express       = require("express");
const bcrypt        = require("bcrypt");
const bodyParser    = require("body-parser");
const cors          = require("cors");
const expressJWT   = require("express-jwt");
const jsonWebToken  = require("jsonwebtoken");
const mongoose      = require("mongoose");
const morgan        = require("morgan");
const validator     = require("validator");
const path          = require("path");

const app           = express();
const config        = require("./config/config");
const apiRouter     = require("./config/apiRouter");
// const webRouter     = require("./config/webRouter");

mongoose.connect(config.db);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ encoded: true }));
app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.use("/api", expressJWT ({ secret: config.secret })
  .unless({
    path: [
      { url : "/api/register", method: ["POST"] },
      { url : "/api/login", method: ["POST"] }
    ]
  }));
app.use(jwtErrorHandler);

function jwtErrorHandler (err, req, res, next) {
  if(err.name !== "UnauthorizedError") return next();
  return res.status(401).json({ message: "Unauthorized Request" });
}

// app.use("/", webRouter);
app.use("/api", apiRouter);


app.listen(config.port, () => console.log(`Express started on: ${config.port}`));
