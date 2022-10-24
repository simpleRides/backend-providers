const Uber = require("../models/uber");

const moment = require("moment");
const momentRandom = require("moment-random");
const fetch = require("node-fetch");
const uid2 = require("uid2");

const API_KEY = process.env.MAPS_API_KEY;

const COORDINATES_MIN = { lat: 48.5, lon: 2 };
const COORDINATES_MAX = { lat: 49.5, lon: 3 };
const MARKUP_MIN = 1;
const MARKUP_MAX = 3;
const MIN_PRICE = 25;
const MAX_PRICE = 150;
const CLIENT_NOTE_MIN = 0;
const CLIENT_NOTE_MAX = 5;

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const myFunc = async function (NB) {
  const arr = [];
  for (let i = 0; i < NB; i++) {
    const lat = randomNumber(COORDINATES_MIN.lat, COORDINATES_MAX.lat);
    const lon = randomNumber(COORDINATES_MIN.lon, COORDINATES_MAX.lon);
    const lat2 = randomNumber(COORDINATES_MIN.lat, COORDINATES_MAX.lat);
    const lon2 = randomNumber(COORDINATES_MIN.lon, COORDINATES_MAX.lon);
    const date = momentRandom(moment().add(3, "days"), moment());

    const mapsFetch = await fetch(
      `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${lat},${lon}&destinations=${lat2},${lon2}&travelMode=driving&key=${API_KEY}`
    );
    const response = await mapsFetch.json();
    const distance =
      response.resourceSets[0].resources[0].results[0].travelDistance.toFixed(
        1
      ) * 1;
    const travelTime =
      response.resourceSets[0].resources[0].results[0].travelDuration.toFixed(
        1
      ) * 1;

    arr.push({
      course_id: uid2(32),
      status: "Pending",
      coordinates: {
        lat: lat,
        lon: lon,
      },
      price: randomNumber(MIN_PRICE, MAX_PRICE).toFixed(0) * 1,
      pickupCoordinates: {
        lat: lat2,
        lon: lon2,
      },
      clientNote: randomNumber(CLIENT_NOTE_MIN, CLIENT_NOTE_MAX).toFixed(2) * 1,
      markup: randomNumber(MARKUP_MIN, MARKUP_MAX).toFixed(2) * 1,
      date: date.toDate(),
      distance: distance,
      travelTime: travelTime,
    });
  }
  return arr;
};

const postGenerate = (req, res) => {
  myFunc(req.params.num)
    .then((res) => {
      res.map((data) => {
        const newUber = new Uber({
          course_id: data.course_id,
          status: data.status,
          coordinates: data.coordinates,
          price: data.price,
          pickupCoordinates: data.pickupCoordinates,
          clientNote: data.clientNote,
          markup: data.markup,
          date: data.date,
          distance: data.distance,
          travelTime: data.travelTime,
        });

        newUber.save();
      });
    })
    .then(() => {
      res.json({
        result: true,
        message: `${req.params.num} trips was generated.`,
      });
    });
};

const deleteAll = (req, res) => {
  Uber.deleteMany().then((data) => {
    if (data.deletedCount > 0) {
      res.json({
        result: true,
        message: `${data.deletedCount} uber trips deleted from database.`,
      });
    } else {
      res.json({ result: false, error: "Nothing to delete" });
    }
  });
};

module.exports = { postGenerate, deleteAll };
