var express = require("express");
var router = express.Router();

require("../models/connection");
const boltController = require("../controllers/bolt.controller");

router.get("/", boltController.getAllRides);
router.get("/id", boltController.getRideById);

router.post("/settings", boltController.postRidesBySettings);
router.put("/ridesTaken", boltController.putRidesTaken);

router.put("/server-refresh", boltController.refreshRidesStatus);
router.put("/server-status-refresh", boltController.statusRefresh);
router.post("/server-generate/:num", boltController.postGenerate);
router.delete("/server-delete", boltController.deleteAll);

module.exports = router;
