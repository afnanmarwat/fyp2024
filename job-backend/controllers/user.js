// const { validationResult } = require("express-validator");

const Job = require("../models/job");
const Applicant = require("../models/applicant");
const JobSeeker = require("../models/jobseeker");
const { validationResult } = require('express-validator');
const { clearResume } = require("../util/helper");
const { dateFormatter } = require("../util/helper");

const fs = require('fs');
const path = require('path');

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



exports.editProfile = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const updatedProfile = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    mobile: req.body.mobile,
    gender: req.body.gender,
    qualification: req.body.qualification,
    experience: req.body.experience,
    role: req.body.role, // Optional: If you allow users to update their role, but usually this should be handled by the backend
    profilePic: req.body.profilePic, // This will be overridden if a new file is uploaded
};

// Check if a new profile picture was uploaded
if (req.file) {
    updatedProfile.profilePic = req.file.path.replace("\\", "/"); // Save the path of the uploaded file
}


  JobSeeker.findById(req.userId)
    .then(jobSeeker => {
      if (!jobSeeker) {
        const error = new Error('JobSeeker not found');
        error.statusCode = 404;
        throw error;
      }

      // If a new profile picture was uploaded and the user already had a profile picture, delete the old one
      if (req.file && jobSeeker.profilePic) {
        const oldImagePath = path.join(__dirname, '..', jobSeeker.profilePic);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.log("Failed to delete old profile picture:", err);
          }
        });
      }

      return JobSeeker.findByIdAndUpdate(req.userId, updatedProfile, { new: true })
        .select('-password')
        .lean();
    })
    .then(updatedJobSeeker => {
      res.status(200).json({
        message: 'JobSeeker profile updated successfully',
        profile: updatedJobSeeker,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAvailableJobs = (req, res, next) => {
  let appliedJobs = [];
  Applicant.find({ userId: req.userId })
    .lean()
    .then((applicants) => {
      applicants.forEach((applicant) => appliedJobs.push(applicant.jobId));
      return Job.find({ _id: { $not: { $in: appliedJobs } } }).lean();
    })
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
exports.getAvailableJobs = async (req, res, next) => {
  try {
    // Fetch applied job IDs
    const appliedJobs = await Applicant.find({ userId: req.userId }).lean().select('jobId');
    const appliedJobIds = appliedJobs.map(applicant => applicant.jobId);

    // Fetch jobs excluding applied ones and populate provider details
    const jobs = await Job.find({ _id: { $nin: appliedJobIds } })
      .lean()
      .populate({
        path: 'providerId',
        select: 'profilePic company'
      });

    // Log jobs with and without valid providerId for debugging
    jobs.forEach(job => {
      if (!job.providerId) {
        console.log('Job with null providerId:', job);
      }
    });

    // Handle cases where providerId might be null
    const jobsWithProviderDetails = jobs.map(job => ({
      ...job,
      providerImage: job.providerId ? job.providerId.profilePic : null,
      providerCompany: job.providerId ? job.providerId.company : 'Unknown'
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

// job by id 
exports.getJobById = async (req, res, next) => {
  const jobId = req.params.jobId;

  try {
    // Fetch the job by ID and populate provider details
    const job = await Job.findById(jobId)
      .lean()
      .populate({
        path: 'providerId',
        select: 'profilePic company'
      });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Handle cases where providerId might be null
    const jobWithProviderDetails = {
      ...job,
      providerImage: job.providerId ? job.providerId.profilePic : null,
      providerCompany: job.providerId ? job.providerId.company : 'Unknown'
    };

    res.status(200).json({
      message: "Fetched the job details",
      job: jobWithProviderDetails
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
