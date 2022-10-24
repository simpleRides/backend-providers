var express = require("express");
var router = express.Router();

require("../models/connection");
const uberController = require("../controllers/uber.controller");

router.get("/", uberController.getAllCourses);
router.get("/id", uberController.getCourseById);

router.post("/params", uberController.postCoursesByParams);
router.put("/courseTaken", uberController.putCourseTaken);

router.put("/server-refresh", uberController.refreshCoursesStatus);
router.post("/server-generate/:num", uberController.postGenerate);
router.delete("/server-delete", uberController.deleteAll);

module.exports = router;
