const mongoose = require("mongoose");

const boltSchema = mongoose.Schema({
  course_id: String,
  status: String,
  coordinates: Object,
  price: Number,
  pickupCoordinates: Object,
  clientNote: Number,
  markup: Number,
  date: Date,
  distance: Number,
  travelTime: Number,
});

const Bolt = mongoose.model("bolts", boltSchema);

module.exports = Bolt;
