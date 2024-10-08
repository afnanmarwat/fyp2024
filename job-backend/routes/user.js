const express = require("express");
// const { body } = require("express-validator");

const userController = require("../controllers/user");

const isAuthenticated = require("../middleware/is-authenticated");
const isApply = require("../middleware/is-apply");
const { isAuthorized, isUser } = require("../middleware/is-authorized");
const uplaod =require("../middleware/multerConfig");

const router = express.Router();

// profile 

router.get(
  "/profile",
  isAuthenticated,
  isAuthorized,
  isUser,
  userController.getProfile
);
router.put(
  "/edite-profile",
  uplaod.single('profilePic'),
  isAuthenticated,
  isAuthorized,
  isUser,
  userController.editProfile
);
// job routes

router.get(
  "/jobsAvailable",
  isAuthenticated,
  isAuthorized,
  isUser,
  userController.getAvailableJobs
);
router.get('/job/:jobId', 
  isAuthenticated,
  isAuthorized,
  isUser,
  userController.getJobById);
// done 
router.get(
  "/jobsApplied",
  isAuthenticated,
  isAuthorized,
  isUser,
  userController.getAppliedJobs
);

router.post(
  "/apply/:jobId",
  isAuthenticated,
  isAuthorized,
  isUser,
  isApply,
  userController.applyJob
);

module.exports = router;
