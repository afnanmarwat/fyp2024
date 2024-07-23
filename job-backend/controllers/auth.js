const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const JobSeeker = require("../models/jobseeker");
const JobProvider = require("../models/jobprovider");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const password = req.body.password;
  const role = req.body.role; // Expecting 'JobSeeker' or 'JobProvider'

  bcryptjs
    .hash(password, 12)
    .then((hashedPw) => {
      let newUser;
      if (role === "JobSeeker") {
        newUser = new JobSeeker({ ...req.body, password: hashedPw });
      } else if (role === "JobProvider") {
        newUser = new JobProvider({ ...req.body, password: hashedPw });
      } else {
        const error = new Error("Invalid role");
        error.statusCode = 422;
        throw error;
      }
      return newUser.save();
    })
    .then((user) => {
      res.status(201).json({ message: "Registered Successfully!" });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(err.statusCode).json({ message: err.message });
    });
};


exports.login = (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error("Validation Failed");
  //   error.statusCode = 422;
  //   error.data = errors.array();
  //   throw error;
  // }
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role; // Expecting 'JobSeeker' or 'JobProvider'
  let loadedUser;

  const User = role === "JobSeeker" ? JobSeeker : JobProvider;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("Email does not exist");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcryptjs.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Incorrect Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          userId: loadedUser._id.toString(),
          userName: loadedUser.name,
          role: role,
        },
        "thisistooconfidential",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login Successful",
        token: token,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
