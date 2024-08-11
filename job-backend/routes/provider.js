const express = require("express");
const { body } = require("express-validator");

const providerController = require("../controllers/provider");
const uplaod =require("../middleware/multerConfig");

const isAuthenticated = require("../middleware/is-authenticated");
const { isAuthorized, isProvider } = require("../middleware/is-authorized");

const router = express.Router();

// job routes
// done 
router.get(
  "/dashboard-stats",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getStats
);
// done 
router.get(
  "/dashboard-recents",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getRecents
);
// done 
router.get(
  "/jobs",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getJobs
);

// done 
router.post(
  "/add-job",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.addJob
);
// done 
router.get(
  "/jobs/:jobId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getJob
);
// done 
router.put(
  "/edit-job/:jobId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.editJob
);
// done 
router.delete(
  "/jobs/:jobId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.deleteJob
);
// done
router.get(
  "/view-applicants/:jobId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getApplicantsForJob
);
//done
router.get(
  "/view-shortlists/:jobId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getShortlistsForJob
);
//done
router.get(
  "/applicants/view-resume/:applicantItemId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getApplicantResume
);

// profile detailes
router.get(
  "/profile",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.getProfile
);
// update profile
router.put(
  "/edit-profile",
  uplaod.single('profilePic'),
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.editProfile
);

router.patch(
  "/applicants/shortlist/:applicantItemId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.shortlistApplicant
);
router.patch(
  "/applicants/reject/:applicantItemId",
  isAuthenticated,
  isAuthorized,
  isProvider,
  providerController.rejectApplicant
);

module.exports = router;
