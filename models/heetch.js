const mongoose = require("mongoose");

const heetchSchema = mongoose.Schema({
  driver: String,
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

const Heetch = mongoose.model("heetchs", heetchSchema);

module.exports = Heetch;
