var express = require("express");
var router = express.Router();

require("../models/connection");
const heetchController = require("../controllers/heetch.controller");

router.get("/", heetchController.getAllCourses);
router.get("/id", heetchController.getCourseById);

router.post("/params", heetchController.postCoursesByParams);
router.put("/courseTaken", heetchController.putCourseTaken);

router.put("/server-refresh", heetchController.refreshCoursesStatus);
router.post("/server-generate/:num", heetchController.postGenerate);
router.delete("/server-delete", heetchController.deleteAll);

module.exports = router;
