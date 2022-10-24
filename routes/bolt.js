var express = require("express");
var router = express.Router();

require("../models/connection");
const boltController = require("../controllers/bolt.controller");

router.post("/server-generate/:num", boltController.postGenerate);
router.delete("/server-delete", boltController.deleteAll);

module.exports = router;
