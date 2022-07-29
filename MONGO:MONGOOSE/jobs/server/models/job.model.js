const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "TITLE IS REQUIRED"],
      minlength: [3, "TITLE NAME MUST BE LARGER THAN 1 CHARACTER"],
    },
    company: {
      type: String,
      required: [true, "COMPANY NAME IS REQUIRED"],
      min: [1, "COMPANY NAME MUST BE LARGER THAN 1 CHARACTER"],
    },
    salary: {
      type: Number,
      required: [true, "SALARY IS REQUIRED"],
      minlength: [2, "SALARY MUST BE LARGER THAN 2 CHARACTERS"],
    },
    isRemote: {
      type: Boolean,
    },
    testDate: {
      type: Date,
    },
    jobType: {
      type: String,
      required: [true, "JOB TYPE IS REQUIRED"],
    },
  },
  { timestamps: true }
);

const job = mongoose.model("job", JobSchema);

module.exports = job;
