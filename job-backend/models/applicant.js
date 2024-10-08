const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applicantSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "JobSeeker",
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  providerId: {
    type: Schema.Types.ObjectId,
    ref: "JobProvider",
    required: true,
  },
});

module.exports = mongoose.model("Applicant", applicantSchema);
