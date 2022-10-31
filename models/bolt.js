const mongoose = require("mongoose");

const boltSchema = mongoose.Schema({
  driver_id: String,
  course_id: String,
  status: String,
  coordinates: Object,
  address: String,
  price: Number,
  pickupCoordinates: Object,
  pickupAddress: String,
  clientNote: Number,
  markup: Number,
  date: Date,
  distance: Number,
  travelTime: Number,
});

const Bolt = mongoose.model("bolts", boltSchema);

module.exports = Bolt;
