const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    providerId: {
      type: Schema.Types.ObjectId,
      ref: "JobProvider",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    numberOfPositions: {
      type: Number,
      required: true,
    },
    salaryRange: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
