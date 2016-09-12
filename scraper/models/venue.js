const mongoose      = require("mongoose");


const venueSchema = new mongoose.Schema({
  name:         { type: String, trim: true, required: true },
  image:        { type: String, trim: true },
  description:  { type: String, trim: true },
  date:         { type: String, trim: true },
  show:         { type: String, trim: true },
  time:         { type: String, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Venue", venueSchema);
