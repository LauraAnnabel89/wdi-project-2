const express         = require("express");
const router          = express.Router();

const authentications = require("../controllers/authentications");
const users           = require("../controllers/users");
const barbers         = require("../controllers/barbers");

router.route("/register")
  .post(authentications.register);
router.route("/login")
  .post(authentications.login);

router.route("/users")
  .get(users.index);
router.route("/users/:id")
  .get(users.show);

router.route("/barbers")
  .get(barbers.index);
router.route("/barbers/:id")
  .get(barbers.show);

module.exports = router;
