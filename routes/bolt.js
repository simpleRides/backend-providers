var express = require("express");
var router = express.Router();

require("../models/connection");
const boltController = require("../controllers/bolt.controller");

router.get("/", boltController.getAllCourses);
router.get("/id", boltController.getCourseById);

router.post("/params", boltController.postCoursesByParams);
router.put("/courseTaken", boltController.putCourseTaken);

router.put("/server-refresh", boltController.refreshCoursesStatus);
router.post("/server-generate/:num", boltController.postGenerate);
router.delete("/server-delete", boltController.deleteAll);
module.exports = router;
