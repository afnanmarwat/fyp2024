const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");
const uplaod =require("../middleware/multerConfig");
const router = express.Router();

router.post(
  "/register",uplaod.single('profilePic'),authController.signup
);

router.post(
  "/login",authController.login
);

module.exports = router;
