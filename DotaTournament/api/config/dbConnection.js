require("dotenv").config();
require("../model/tournament");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("connected", function () {
    console.log("Mongoose connected");
  })
  .on("disconnected", function () {
    console.log("Mongoose disconnected");
  })
  .on("error", function (err) {
    console.log("Mongoose connection error", err);
  });

process
  .on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log("Mongoose disconnected by app disconnect");
      process.exit(0);
    });
  })
  .on("SIGTERM", function () {
    mongoose.connection.close(function () {
      console.log("Mongoose disconnected by app termination");
      process.exit(0);
    });
  });
