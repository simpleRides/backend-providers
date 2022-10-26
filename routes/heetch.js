var express = require("express");
var router = express.Router();

require("../models/connection");
const heetchController = require("../controllers/heetch.controller");

router.get("/", heetchController.getAllRides);
router.get("/id", heetchController.getRideById);

router.post("/settings", heetchController.postRidesBySettings);
router.put("/ridesTaken", heetchController.putRidesTaken);

router.put("/server-refresh", heetchController.refreshRidesStatus);
router.post("/server-generate/:num", heetchController.postGenerate);
router.delete("/server-delete", heetchController.deleteAll);

module.exports = router;
