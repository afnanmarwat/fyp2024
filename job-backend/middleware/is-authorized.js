const User = require("../models/user");
const JobSeeker = require("../models/jobseeker");
const JobProvider = require("../models/jobprovider");
exports.isAuthorized = (req, res, next) => {
  // First, check if the user exists in the JobProvider schema
  JobProvider.findById(req.userId)
    .then((user) => {
      if (user) {
        req.role = 'JobProvider';
        next();
        // Return null to end the promise chain for JobSeeker check
        return null;
      } else {
        // If user is not found in JobProvider, check in JobSeeker schema
        return JobSeeker.findById(req.userId);
      }
    })
    .then((user) => {
      if (user) {
        req.role = 'JobSeeker';
        next();
      } else if (user === null) {
        // If user is null, it means the previous check passed and no need to do anything
        return;
      } else {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.isAdmin = (req, res, next) => {
  // console.log(req.role);
  if (req.role !== "Admin") {
    const err = new Error("Not Authorized");
    err.statusCode = 401;
    next(err);
  }
  next();
};
exports.isProvider = (req, res, next) => {
  console.log(req.role);
  if (req.role !== "JobProvider") {
    const err = new Error("Not Authorized");
    err.statusCode = 401;
    next(err);
  }
  next();
};
exports.isUser = (req, res, next) => {
  if (req.role !== "JobSeeker") {
    const err = new Error("Not Authorized");
    err.statusCode = 401;
    next(err);
  }
  next();
};
