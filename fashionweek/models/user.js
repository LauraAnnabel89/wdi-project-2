const mongoose  = require("mongoose");
const bcrypt    = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username:       { type: String, trim: true, required: true },
  email:          { type: String, trim: true, required: true },
  passwordHash:   { type: String, required: true }
});


module.exports = mongoose.model("User", userSchema);
