const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    mobile: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    qualification: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: "User",
      required: false,
    },
  
    jobsPosted: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    profilePic: {
      type: String, // URL of the profile picture
      required: false,
      default: "/default_profile.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
