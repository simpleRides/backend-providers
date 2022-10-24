var express = require("express");
var router = express.Router();

require("../models/connection");
const heetchController = require("../controllers/heetch.controller");

router.post("/server-generate/:num", heetchController.postGenerate);
router.delete("/server-delete", heetchController.deleteAll);

module.exports = router;
