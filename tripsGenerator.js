const moment = require("moment");
const momentRandom = require("moment-random");
const fs = require("fs");
const fetch = require("node-fetch");

const API_KEY = process.env.MAPS_API_KEY;
// générer markup entre 1 et 3
const NB_TRIPS = 10;
const COORDINATES_MIN = { lat: 48.5, lon: 2 };
const COORDINATES_MAX = { lat: 49.5, lon: 3 };
const MARKUP_MIN = 1;
const MARKUP_MAX = 3;
const MIN_PRICE = 25;
const MAX_PRICE = 150;
const CLIENT_NOTE_MIN = 0;
const CLIENT_NOTE_MAX = 5;

// function randomElement(array, nb) {
//   const shuffled = [...array].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, nb);
// }

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// function distance(lat1, lon1, lat2, lon2, unit) {
//   if (lat1 == lat2 && lon1 == lon2) {
//     return 0;
//   } else {
//     var radlat1 = (Math.PI * lat1) / 180;
//     var radlat2 = (Math.PI * lat2) / 180;
//     var theta = lon1 - lon2;
//     var radtheta = (Math.PI * theta) / 180;
//     var dist =
//       Math.sin(radlat1) * Math.sin(radlat2) +
//       Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//     if (dist > 1) {
//       dist = 1;
//     }
//     dist = Math.acos(dist);
//     dist = (dist * 180) / Math.PI;
//     dist = dist * 60 * 1.1515;
//     if (unit == "K") {
//       dist = dist * 1.609344;
//     }
//     if (unit == "N") {
//       dist = dist * 0.8684;
//     }
//     return dist;
//   }
// }

const trips = [];

for (let i = 0; i < NB_TRIPS; i++) {
  const lat = randomNumber(COORDINATES_MIN.lat, COORDINATES_MAX.lat);
  const lon = randomNumber(COORDINATES_MIN.lon, COORDINATES_MAX.lon);
  const lat2 = randomNumber(COORDINATES_MIN.lat, COORDINATES_MAX.lat);
  const lon2 = randomNumber(COORDINATES_MIN.lon, COORDINATES_MAX.lon);
  const date = momentRandom(moment().add(3, "days"), moment());

  fetch(
    `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${lat},${lon}&destinations=${lat2},${lon2}&travelMode=driving&key=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.resourceSets[0].resources[0].results[0].travelDistance);
      trips.push({
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
        clientNote:
          randomNumber(CLIENT_NOTE_MIN, CLIENT_NOTE_MAX).toFixed(2) * 1,
        markup: randomNumber(MARKUP_MIN, MARKUP_MAX).toFixed(2) * 1,
        date: date.toDate(),
        distance: data.resourceSets[0].results[0].resources[0].travelDistance,
      });
    });
}

// const sortedTrips = trips.sort((a, b) => a.date - b.date);
fs.writeFile("./trips.json", JSON.stringify(trips), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(
      `${NB_TRIPS} trips have been generated in trips.json file. Happy hackathon!`
    );
  }
});
