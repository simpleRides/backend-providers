var express = require("express");
var router = express.Router();

require("../models/connection");
const usersController = require("../controllers/users.controller");

router.post("/signup", usersController.postSignup);
router.post("/signin", usersController.postSignin);
router.delete("/delete", usersController.deleteAll);

module.exports = router;
