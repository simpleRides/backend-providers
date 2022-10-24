var express = require("express");
var router = express.Router();

require("../models/connection");
const uberController = require("../controllers/uber.controller");

router.post("/server-generate/:num", uberController.postGenerate);
router.delete("/server-delete", uberController.deleteAll);

module.exports = router;
