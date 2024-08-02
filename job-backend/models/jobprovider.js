const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobProviderSchema = new Schema(
  {
    
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    bio:{
        type: String,
        required: true,
    },
    jobsPosted: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    profilePic: {
      type: String, // URL of the profile picture
      required: false, // Optional
    },
    role:{
        type: String,
        default: "JobProvider",
    },
     location:{
      type: String,
     
  }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobProvider", jobProviderSchema);
