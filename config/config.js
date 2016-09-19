module.exports = {
  port:   process.env.PORT || 3000,
  db: {
    test: "mongodb://localhost/barber-api-test",
    development: "mongodb://localhost/barber-api-development",
    production: process.env.MONGODB_URI || "mongodb://localhost/barber-api-production",
    authentication: process.env.MONGODB_URI || "mongodb://localhost/express-authentication-jwt"
  },
  secret: process.env.SECRET || "secrets and such"
};
