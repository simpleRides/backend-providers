const mongoose = require("mongoose");

const uberSchema = mongoose.Schema({
  driver: String,
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

const Uber = mongoose.model("ubers", uberSchema);

module.exports = Uber;
