const mongoose = require("mongoose");

const barberSchema = new mongoose.Schema({
  name:         { type: String, trim: true, required: true },
  image:        { type: String, trim: true, required: true },
  description:  { type: String, trim: true, required: true },
  lat:          { type: String, time: true, required: true },
  lng:          { type: String, time: true, required: true },
  // priceforcut:  { type: Number, },
  shave:        { type: Boolean, required: true}
}, {
timestamps: true
});

module.exports = mongoose.model("Barber", barberSchema);
