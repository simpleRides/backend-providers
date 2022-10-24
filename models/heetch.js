const mongoose = require("mongoose");

const heetchSchema = mongoose.Schema({
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

const Heetch = mongoose.model("heetchs", heetchSchema);

module.exports = Heetch;