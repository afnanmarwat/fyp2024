const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const JobSeeker = require('../models/jobseeker'); // Adjust the path to your JobSeeker model
const JobProvider = require('../models/jobprovider'); // Adjust the path to your JobProvider model

const User = require("../models/user");
const Job = require("../models/job");
const Applicant = require("../models/applicant");

const { clearResume } = require("../util/helper");

// done 
exports.getStats = (req, res, next) => {
  let providerCount;
  let seekerCount;
  let jobCount;
  let applicantCount;

  // Define queries for each count
  const jobProviderCountQuery = JobProvider.countDocuments({ _id: { $ne: req.userId } });
  const jobSeekerCountQuery = JobSeeker.countDocuments({ _id: { $ne: req.userId } });
  const jobCountQuery = Job.countDocuments();
  const applicantCountQuery = Applicant.countDocuments();

  // Execute all queries in parallel
  Promise.all([jobProviderCountQuery, jobSeekerCountQuery, jobCountQuery, applicantCountQuery])
    .then(([providerCountResult, seekerCountResult, jobCountResult, applicantCountResult]) => {
      providerCount = providerCountResult;
      seekerCount = seekerCountResult;
      jobCount = jobCountResult;
      applicantCount = applicantCountResult;

      res.status(200).json({
        message: "Successfully fetched stats",
        stats: { jobCount, providerCount, applicantCount, seekerCount },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
// done 
exports.getRecent = (req, res, next) => {
  let recentUsers = [];
  let recentJobs = [];
  User.find({ _id: { $ne: req.userId } })
    .lean()
    .sort({ createdAt: -1 })
    .limit(3)
    .then((users) => {
      recentUsers = users;
      return Job.find().lean().sort({ createdAt: -1 }).limit(3);
    })
    .then((jobs) => {
      recentJobs = jobs;
      res.status(200).json({
        message: "Successfully fetched recent stats",
        recentUsers,
        recentJobs,
      });
    });
};
// done 
exports.getUsers = (req, res, next) => {
  // Queries to fetch users from both JobSeeker and JobProvider schemas, excluding the current user
  const jobSeekerQuery = JobSeeker.find({ _id: { $ne: req.userId } }).lean();
  const jobProviderQuery = JobProvider.find({ _id: { $ne: req.userId } }).lean();

  // Execute both queries in parallel
  Promise.all([jobSeekerQuery, jobProviderQuery])
    .then(([jobSeekers, jobProviders]) => {
      // Log the results to debug
      console.log('Job Seekers:', jobSeekers);
      console.log('Job Providers:', jobProviders);

      // Combine both results
      const users = {
        jobSeekers,
        jobProviders,
      };
console.log()
      res.status(200).json({
        message: "Fetched the list of users",
        users: users,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// done
exports.postUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const password = req.body.password;
  const role = req.body.role; // Expecting 'JobSeeker' or 'JobProvider'
console.log('admin role ', role);
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
      res.status(201).json({ message: "User Added Successfully!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getJobSeeker = (req, res, next) => {
  const userId = req.params.userId;
  console.log(`getJobSeeker`, userId);

  JobSeeker.findById(userId)
    .lean()
    .then((foundUser) => {
      if (foundUser) {
        console.log(`JobSeeker found:`, foundUser);
        foundUser.role = 'JobSeeker'; // Add role information
        res.status(200).json({ message: 'Fetched the JobSeeker successfully', user: foundUser });
      } else {
        const error = new Error('JobSeeker not found');
        error.statusCode = 404;
        throw error;
      }
    })
    .catch((err) => {
      console.error(`Error occurred:`, err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getJobProvider = (req, res, next) => {
  const userId = req.params.userId;
  console.log(`getJobProvider`, userId);

  JobProvider.findById(userId)
    .lean()
    .then((foundUser) => {
      if (foundUser) {
        console.log(`JobProvider found:`, foundUser);
        foundUser.role = 'JobProvider'; // Add role information
        res.status(200).json({ message: 'Fetched the JobProvider successfully', user: foundUser });
      } else {
        const error = new Error('JobProvider not found');
        error.statusCode = 404;
        throw error;
      }
    })
    .catch((err) => {
      console.error(`Error occurred:`, err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
// exports.getUser = (req, res, next) => {
//   const userId = req.params.userId;
//   console.log(`getUser`, userId);
//   let user; // Variable to store user details

//   // First, try to find the user as a JobSeeker
//   JobSeeker.findById(userId)
//     .lean()
//     .then((foundUser) => {
//       if (foundUser) {
//         console.log(`JobSeeker found:`, foundUser);
//         user = foundUser;
//         user.role = 'JobSeeker'; // Add role information
//         return Promise.resolve(); // Continue to the next then block
//       }
//       // If not found as JobSeeker, try JobProvider
//       console.log(`JobSeeker not found, trying JobProvider`);
//       return JobProvider.findById(userId).lean();
//     })
//     .then((foundUser) => {
//       if (foundUser) {
//         console.log(`JobProvider found:`, foundUser);
//         user = foundUser;
//         user.role = 'JobProvider'; // Add role information
//         return Promise.resolve(); // Continue to the next then block
//       }
//       // If user is not found in both collections
//       console.log(`User not found in both JobSeeker and JobProvider`);
//       const error = new Error('User not found');
//       error.statusCode = 404;
//       throw error;
//     })
//     .then(() => {
//       // Respond with the user details
//       console.log(`Fetched user successfully:`, user);
//       res.status(200).json({ message: 'Fetched the user successfully', user: user });
//     })
//     .catch((err) => {
//       console.error(`Error occurred:`, err);
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

exports.editUser = (req, res, next) => {
  const userId = req.params.userId;
console.log(`Edit user ${userId}`);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  if (userId === req.userId) {
    const error = new Error("Cannot edit the current User");
    error.statusCode = 401;
    throw error;
  }

  const updateUser = (Model) => {
    return Model.findByIdAndUpdate(userId, req.body, { new: true, useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).json({
            message: `Cannot update user with id=${userId}. Maybe user was not found!`,
          });
        } else {
          res.status(200).json({ message: "User was updated successfully.", user: data });
        }
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

  // Determine the user's role and update accordingly
  JobSeeker.findById(userId).then((user) => {
    if (user) {
      updateUser(JobSeeker);
    } else {
      JobProvider.findById(userId).then((user) => {
        if (user) {
          updateUser(JobProvider);
        } else {
          res.status(404).json({ message: `User with id=${userId} not found.` });
        }
      });
    }
  }).catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};
exports.editJobProvider = (req, res, next) => {
  const userId = req.params.userId;
  console.log(`Edit JobProvider ${userId}`);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  if (userId === req.userId) {
    const error = new Error("Cannot edit the current User");
    error.statusCode = 401;
    throw error;
  }

  const updateData = {
    email: req.body.email,
    password: req.body.password,
    company: req.body.company,
    bio: req.body.bio,
    location: req.body.location,
  };

  if (req.file) {
    updateData.profilePic = req.file.path;
  }

  JobProvider.findByIdAndUpdate(userId, updateData, { new: true, useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update JobProvider with id=${userId}. Maybe JobProvider was not found!`,
        });
      } else {
        res.status(200).json({ message: "JobProvider was updated successfully.", user: data });
      }
    })
    .catch((err) => {
      console.error(`Update error:`, err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  if (userId === req.userId) {
    const error = new Error("Cannot delete the current User");
    error.statusCode = 401;
    return next(error);
  }

  let role;
  let user;

  try {
    // First, try to find the user as a JobSeeker
    user = await JobSeeker.findById(userId).lean();
    if (user) {
      role = "JobSeeker";
    } else {
      // If not found as JobSeeker, try JobProvider
      user = await JobProvider.findById(userId).lean();
      if (user) {
        role = "JobProvider";
      } else {
        // If user is not found in both collections
        const error = new Error("User not found!");
        error.statusCode = 404;
        throw error;
      }
    }

    if (role === "JobSeeker") {
      // Delete the JobSeeker
      await JobSeeker.findByIdAndDelete(userId);

      // Handle specific logic for JobSeeker
      const applicants = await Applicant.find({ userId: userId }).lean();
      const resumes = applicants.map(applicant => applicant.resume);
      const applicantIds = applicants.map(applicant => applicant._id);

      // Delete applicants
      await Applicant.deleteMany({ _id: { $in: applicantIds } });

      // Clear resumes
      resumes.forEach(resume => clearResume(resume));
    } else if (role === "JobProvider") {
      // Get the jobs posted by the Job Provider
      const jobProvider = await JobProvider.findById(userId).populate('jobsPosted').lean();
      const jobs = jobProvider.jobsPosted.map(job => job._id);

      // Delete the jobs associated with the Job Provider
      if (jobs.length > 0) {
        await Job.deleteMany({ _id: { $in: jobs } });
      }

      // Delete the JobProvider
      await JobProvider.findByIdAndDelete(userId);
    }

    res.json({ message: "User record was deleted successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Function to clear resumes (assuming this is defined somewhere)
// function clearResume(resume) {
//   // Implement the logic to delete or clear the resume file
// }

exports.getJobs = (req, res, next) => {
  Job.find()
    .lean()
    .then((jobs) => {
      res.status(200).json({
        message: "Fetched the list of jobs",
        jobs: jobs,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addJob = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  let jobId;

  const newJob = new Job({ ...req.body, providerId: req.userId });
  newJob
    .save()
    .then((job) => {
      jobId = job._id;
      return User.findById(req.userId);
    })
    .then((user) => {
      user.jobsPosted.push(jobId);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Job Added Successfully" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getJob = (req, res, next) => {
  const jobId = req.params.jobId;

  Job.findById(jobId)
    .lean()
    .then((job) => {
      if (!job) {
        const error = new Error("Job not found");
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Fetched the job Successfully", job: job });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editJob = (req, res, next) => {
  const jobId = req.params.jobId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  Job.findByIdAndUpdate(jobId, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update job with id=${id}. Maybe job was not found!`,
        });
      } else res.status(200).json({ message: "Job was updated successfully." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteJob = (req, res, next) => {
  const jobId = req.params.jobId;
  let providerId;
  let resumes = [];
  let applicants = [];

  Job.findById(jobId)
    .then((job) => {
      if (!job) {
        const error = new Error("Cannot delete job. Job not found!");
        error.statusCode = 404;
        throw err;
      }
      providerId = job.providerId;
      return Job.findByIdAndDelete(jobId);
    })
    .then((result) => {
      return User.findByIdAndUpdate(
        { _id: providerId },
        { $pull: { jobsPosted: jobId } }
      );
    })
    .then((result) => {
      return Applicant.find({ jobId: jobId }).then((docs) => {
        docs.forEach((doc) => resumes.push(doc.resume));
        docs.forEach((doc) => applicants.push(doc._id));
      });
    })
    .then((result) => {
      return Applicant.deleteMany({ _id: { $in: applicants } });
    })
    .then((result) => {
      resumes.forEach((resume) => clearResume(resume));
      res.json({
        message: "Job record was deleted successfully!",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
