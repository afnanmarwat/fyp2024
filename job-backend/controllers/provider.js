const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const Job = require("../models/job");
const Applicant = require("../models/applicant");
const User = require("../models/user");
// const Job = require("../models/job");
const JobProvider = require("../models/jobprovider");

const { clearResume } = require("../util/helper");


// In your controller file (e.g., controllers/jobprovider.js)

exports.getProfile = (req, res, next) => {
  JobProvider.findById(req.userId)
    .select('-password') // Exclude password from the result
    .lean()
    .then((jobProvider) => {
      if (!jobProvider) {
        const error = new Error('Job provider not found');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'Job provider profile fetched successfully',
        profile: jobProvider,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// edite profile 
exports.editProfile = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const updatedData = {
    company: req.body.company,
    email: req.body.email,
    phone: req.body.phone,
    bio: req.body.bio,
    // Add other fields as necessary
  };

  // Check if a new profile picture was uploaded
  if (req.file) {
    updatedData.profilePic = req.file.path.replace("\\", "/"); // Save the path of the uploaded file
  }

  JobProvider.findById(req.userId)
    .then(jobProvider => {
      if (!jobProvider) {
        const error = new Error('Job provider not found');
        error.statusCode = 404;
        throw error;
      }

      // If a new profile picture was uploaded and the user already had a profile picture, delete the old one
      if (req.file && jobProvider.profilePic) {
        const oldImagePath = path.join(__dirname, '..', jobProvider.profilePic);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.log("Failed to delete old profile picture:", err);
          }
        });
      }

      return JobProvider.findByIdAndUpdate(req.userId, updatedData, { new: true })
        .select('-password') // Exclude password from the result
        .lean();
    })
    .then(updatedJobProvider => {
      res.status(200).json({
        message: 'Job provider profile updated successfully',
        profile: updatedJobProvider,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.getStats = (req, res, next) => {
  let jobsCount = 0;
  let applicantsCount = 0;
  Job.find({ providerId: req.userId })
    .countDocuments()
    .then((jobs) => {
      jobsCount = jobs;
      return Applicant.find({ providerId: req.userId }).countDocuments();
    })
    .then((applicants) => {
      applicantsCount = applicants;
      return res.status(200).json({
        message: "Successfully fetched the stats",
        stats: { jobsCount, applicantsCount },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getRecents = (req, res, next) => {
  Job.find({ providerId: req.userId })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean()
    .then((jobs) => {
      return res
        .status(200)
        .json({
          message: "Successfully fetched the recent jobs",
          recentJobs: jobs,
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getJobs = (req, res, next) => {
  Job.find({ providerId: req.userId })
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

// exports.addJob = (req, res, next) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const error = new Error("Validation failed");
//     error.statusCode = 422;
//     error.data = errors.array();
//     throw error;
//   }

//   const newJob = new Job({
//     title: req.body.title,
//     description: req.body.description,
//     location: req.body.location,
//     salary: req.body.salary,
//     type: req.body.type,
//     ...req.body,
//     providerId: req.userId,
//   });
//   let jobId;
//   newJob
//     .save()
//     .then((job) => {
//       jobId = job._id;
//       return JobProvider.findById(req.userId);
//     })
//     .then((user) => {
//       user.jobsPosted.push(jobId);
//       return user.save();
//     })
//     .then((result) => {
//       res.status(201).json({ message: "Job Added Successfully" });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// addjob done 
exports.addJob = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const newJob = new Job({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location,
    numberOfPositions: req.body.numberOfPositions,
    salaryRange: req.body.salaryRange,
    age: req.body.age,
    qualification: req.body.qualification,
    type:req.body.type,
    providerId: req.userId, // Assuming req.userId is set to the logged-in job provider's ID
  });

  let jobId;
  newJob
    .save()
    .then((job) => {
      jobId = job._id;
      return JobProvider.findById(req.userId);
    })
    .then((jobProvider) => {
      if (!jobProvider) {
        const error = new Error("Job provider not found");
        error.statusCode = 404;
        throw error;
      }
      if (!Array.isArray(jobProvider.jobsPosted)) {
        jobProvider.jobsPosted = [];
      }
      jobProvider.jobsPosted.push(jobId);
      return jobProvider.save();
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
// done 
exports.getJob = (req, res, next) => {
  const jobId = req.params.jobId;

  Job.findOne({ _id: jobId, providerId: req.userId })
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
 
// done 
exports.editJob = (req, res, next) => {
  const jobId = req.params.jobId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  Job.findOneAndUpdate({ _id: jobId, providerId: req.userId }, req.body, {
    useFindAndModify: false,
  })
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

// done 
exports.deleteJob = (req, res, next) => {
  const jobId = req.params.jobId;
  let resumes = [];
  let applicants = [];

  Job.findOneAndDelete({ _id: jobId, providerId: req.userId })
    .then((data) => {
      if (!data) {
        const error = new Error("Cannot delete job. Job not found!");
        error.statusCode = 404;
        throw error;
      }
      return User.findOneAndUpdate(
        { _id: req.userId },
        { $pull: { jobsPosted: jobId } }
      );
    })
    .then((result) => {
      return Applicant.find({ jobId: jobId, providerId: req.userId }).then(
        (docs) => {
          docs.forEach((doc) => resumes.push(doc.resume));
          docs.forEach((doc) => applicants.push(doc._id));
        }
      );
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

// done
exports.getApplicantsForJob = (req, res, next) => {
  const jobId = req.params.jobId;
  const providerId = req.userId;

  Applicant.find({
    providerId: providerId,
    jobId: jobId,
    status: { $regex: "Applied", $options: "i" },
  })
    .populate("userId", "name")
    .lean()

    .then((applicants) => {
      if (!applicants) {
        return res
          .status(200)
          .json({ message: "Looks like no one has applied yet!" });
      }
      return res.status(200).json({
        message: "Successfully fetched the applicants",
        applicants: applicants,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getShortlistsForJob = (req, res, next) => {
  const jobId = req.params.jobId;
  const providerId = req.userId;

  Applicant.find({
    providerId: providerId,
    jobId: jobId,
    status: { $regex: "Shortlisted", $options: "i" },
  })
    .populate("userId", "name email")
    .lean()

    .then((applicants) => {
      if (!applicants) {
        return res
          .status(200)
          .json({ message: "Looks like no one has been shortlisted yet!" });
      }
      return res.status(200).json({
        message: "Successfully fetched the applicants",
        shortlists: applicants,
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
exports.getApplicantResume = (req, res, next) => {
  const applicantId = req.params.applicantItemId;
  Applicant.findOne({ _id: applicantId, providerId: req.userId })
    .lean()
    .then((applicant) => {
      if (!applicant) {
        return res.status(404).json({ message: "Applicant not found" });
      }
      const resumeFile = applicant.resume;
      const resumePath = path.join(resumeFile);
      fs.readFile(resumePath, (err, data) => {
        if (err) {
          return next(err);
        }
        res.setHeader("Content-type", "application/pdf");
        res.send(data);
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
//done
exports.shortlistApplicant = (req, res, next) => {
  const applicantItemId = req.params.applicantItemId;
  Applicant.findById({ _id: applicantItemId })
    .then((applicant) => {
      if (!applicant) {
        return res.status(401).json({ message: "Applicant not found" });
      }
      if (applicant.providerId.toString() !== req.userId.toString()) {
        const error = new Error("You are unauthorized to do the action!");
        error.statusCode = 401;
        throw error;
      }
      if (applicant.status === "Shortlisted") {
        return res.status(409).json({ message: "Already shortlisted!" });
      }
      applicant.status = "Shortlisted";
      return applicant.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Shortlisted the candidate!" });
    })
    .catch((err) => {
      // console.log(err);
      next(err);
    });
};
// done 
exports.rejectApplicant = (req, res, next) => {
  const applicantItemId = req.params.applicantItemId;

  Applicant.findById(applicantItemId)
    .then((applicant) => {
      if (!applicant) {
        return res.status(404).json({ message: "Applicant not found!" });
      }
      if (req.userId.toString() !== applicant.providerId.toString()) {
        const error = new Error("You are unauthorized to do the action!");
        error.statusCode = 401;
        throw error;
      }
      clearResume(applicant.resume);
      return Applicant.findByIdAndDelete(applicantItemId);
    })
    .then((result) => {
      return res
        .status(200)
        .json({ message: "Applicant rejected successfully!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
