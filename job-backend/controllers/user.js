// const { validationResult } = require("express-validator");

const Job = require("../models/job");
const Applicant = require("../models/applicant");
const JobSeeker = require("../models/jobseeker");

const { clearResume } = require("../util/helper");
const { dateFormatter } = require("../util/helper");



// profile 
exports.getProfile = (req, res, next) => {
  JobSeeker.findById(req.userId)
    .select('-password') // Exclude password from the result
    .lean()
    .then((jobSeeker) => {
      if (!jobSeeker) {
        const error = new Error('JobSeeker not found');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'JobSeeker profile fetched successfully',
        profile: jobSeeker,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// exports.editProfile = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error('Validation failed');
//     error.statusCode = 422;
//     error.data = errors.array();
//     throw error;
//   }

//   const updatedProfile = {
//     name: req.body.name,
//     email: req.body.email,
//     // Add more fields as needed
//   };

//   JobSeeker.findByIdAndUpdate(req.userId, updatedProfile, { new: true })
//     .select('-password')
//     .lean()
//     .then((jobSeeker) => {
//       if (!jobSeeker) {
//         const error = new Error('JobSeeker not found');
//         error.statusCode = 404;
//         throw error;
//       }
//       res.status(200).json({
//         message: 'JobSeeker profile updated successfully',
//         profile: jobSeeker,
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
// exports.getAvailableJobs = (req, res, next) => {
//   let appliedJobs = [];
//   Applicant.find({ userId: req.userId })
//     .lean()
//     .then((applicants) => {
//       applicants.forEach((applicant) => appliedJobs.push(applicant.jobId));
//       return Job.find({ _id: { $not: { $in: appliedJobs } } }).lean();
//     })
//     .then((jobs) => {
//       res.status(200).json({
//         message: "Fetched the list of jobs",
//         jobs: jobs,
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
exports.getAvailableJobs = async (req, res, next) => {
  try {
    const appliedJobs = await Applicant.find({ userId: req.userId }).lean().select('jobId');
    const appliedJobIds = appliedJobs.map(applicant => applicant.jobId);

    const jobs = await Job.find({ _id: { $nin: appliedJobIds } })
      .lean()
      .populate({
        path: 'providerId',
        select: 'profilePic company'
      });

    const jobsWithProviderDetails = jobs.map(job => ({
      ...job,
      providerImage: job.providerId ? job.providerId.profilePic : null,
      providerCompany: job.providerId ? job.providerId.company : null
    }));

    res.status(200).json({
      message: "Fetched the list of jobs",
      jobs: jobsWithProviderDetails
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.getAppliedJobs = (req, res, next) => {
  let appliedJobs = [];
  const statusMap = new Map();
  Applicant.find({ userId: req.userId })
    .lean()
    .then((applicants) => {
      // console.log(applicants);
      applicants.forEach((applicant) => {
        appliedJobs.push(applicant.jobId);
        statusMap.set(applicant.jobId.toString(), applicant.status);
      });
      return Job.find({ _id: { $in: appliedJobs } }).lean();
    })
    .then((jobsApplied) => {
      jobsApplied.forEach((applied) => {
        applied.status = statusMap.get(applied._id.toString());
      });
      res.status(200).json({
        message: "Fetched the list of jobs",
        jobsApplied: jobsApplied,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.applyJob = (req, res, next) => {
  if (!req.file) {
    const err = new Error("Resume not Found");
    err.statusCode = 422;
    throw err;
  }
  const jobId = req.params.jobId;
  const userId = req.userId;
  const providerId = req.body.providerId;
  const resume = req.file.path.replace("\\", "/");
  let status;
console.log(userId,providerId);
  Applicant.findOne({ jobId: jobId, userId: userId })
    .then((applicant) => {
      if (applicant) {
        clearResume(resume);
        return res
          .status(409)
          .json({ message: "You have already applied for the job!" });
      }
      status = "Applied";

      const newApplicant = new Applicant({
        jobId: jobId,
        userId: userId,
        resume: resume,
        status: status,
        providerId: providerId,
      });
      return newApplicant.save();
    })
    .then((result) => {
      res.status(201).json({ message: "Successfully applied for the job!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
