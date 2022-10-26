var express = require("express");
var router = express.Router();

require("../models/connection");
const uberController = require("../controllers/uber.controller");

router.get("/", uberController.getAllRides);
router.get("/id", uberController.getRideById);

router.post("/settings", uberController.postRidesBySettings);
router.put("/ridesTaken", uberController.putRidesTaken);

router.put("/server-refresh", uberController.refreshRidesStatus);
router.post("/server-generate/:num", uberController.postGenerate);
router.delete("/server-delete", uberController.deleteAll);

module.exports = router;
