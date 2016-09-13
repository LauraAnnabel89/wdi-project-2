module.exports = {
  index:  barberIndex,
  show:   barberShow,
};

const Barber = require("../models/barber");

function barberIndex(req, res){
  Barber.find({}, (err, barbers) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    return res.status(200).json({ barbers });
  });
}

function barberShow(req, res){
  Barbers.findById(req.params.id, (err, barber) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!barber) return res.status(404).json({ message: "No restaurant was found." });
    return res.status(200).json({ barber });
  });
}
