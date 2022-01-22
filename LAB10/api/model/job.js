const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  address: String,
  coordinates: {
    type: [Number],
    index: "2dshpere",
  },
});

const jobSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  salary: {
    required: true,
    type: Number,
  },
  location: locationSchema,
  description: String,
  experience: String,
  skills: [String],
  postDate: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("Job", jobSchema, "jobs");
