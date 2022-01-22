require("dotenv").config();
require("../model/job");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL);
mongoose.connection
  .on("connected", function () {
    console.log("Mongoose connected");
  })
  .on("disconnected", function () {
    console.log("Mongoose disconnected");
  })
  .on("error", function () {
    console.log("connection error");
  });

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Disconnected");
    process.exit(0);
  });
});
