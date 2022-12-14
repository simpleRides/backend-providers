const moment = require("moment");
const momentRandom = require("moment-random");
const fetch = require("node-fetch");
const uid2 = require("uid2");

const API_KEY = process.env.MAPS_API_KEY;

const COORDINATES_MIN = { lat: 48.8212, lon: 2.22984 };
const COORDINATES_MAX = { lat: 48.89964, lon: 2.41928 };
const MARKUP_MIN = 1;
const MARKUP_MAX = 3;
const MIN_PRICE = 25;
const MAX_PRICE = 150;
const CLIENT_NOTE_MIN = 0;
const CLIENT_NOTE_MAX = 5;

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const generator = async function (NB) {
  const arr = [];
  for (let i = 0; i < NB; i++) {
    const lat = randomNumber(COORDINATES_MIN.lat, COORDINATES_MAX.lat);
    const lon = randomNumber(COORDINATES_MIN.lon, COORDINATES_MAX.lon);
    const lat2 = randomNumber(COORDINATES_MIN.lat, COORDINATES_MAX.lat);
    const lon2 = randomNumber(COORDINATES_MIN.lon, COORDINATES_MAX.lon);
    const date = momentRandom(moment().add(3, "hours"), moment());

    const mapsFetch = await fetch(
      `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${lat},${lon}&destinations=${lat2},${lon2}&travelMode=driving&key=${API_KEY}`
    );
    const response = await mapsFetch.json();
    const distance =
      response.resourceSets[0]?.resources[0]?.results[0]?.travelDistance.toFixed(1
      ) * 1 || 0;
    const travelTime =
      response.resourceSets[0]?.resources[0]?.results[0]?.travelDuration.toFixed(
        1
      ) * 1 || 0;

    const addressFetch = await fetch(
      `http://dev.virtualearth.net/REST/v1/Locations/${lat}, ${lon}?key=${API_KEY}`
    );
    const addressResponse = await addressFetch.json();
    const address = addressResponse.resourceSets[0]?.resources[0]?.name;

    const pickupAddressFetch = await fetch(
      `http://dev.virtualearth.net/REST/v1/Locations/${lat2}, ${lon2}?key=${API_KEY}`
    );
    const pickupAddressResponse = await pickupAddressFetch.json();
    const pickupAddress =
      pickupAddressResponse.resourceSets[0]?.resources[0]?.name;

    arr.push({
      course_id: uid2(32),
      status: "Pending",
      coordinates: {
        lat: lat,
        lon: lon,
      },
      address: address,
      price: randomNumber(MIN_PRICE, MAX_PRICE).toFixed(0) * 1,
      pickupCoordinates: {
        lat: lat2,
        lon: lon2,
      },
      pickupAddress: pickupAddress,
      clientNote: randomNumber(CLIENT_NOTE_MIN, CLIENT_NOTE_MAX).toFixed(2) * 1,
      markup: randomNumber(MARKUP_MIN, MARKUP_MAX).toFixed(2) * 1,
      date: date.toDate(),
      distance: distance,
      travelTime: travelTime,
    });
  }
  return arr;
};

module.exports = { generator };
