require("dotenv").config();
const express = require("express");
const router = require("./api/routes");
const app = express();

app.use(function (req, res, next) {
  next();
});

app.use("/api", router);

app.listen(process.env.PORT, function () {
  console.log("Listening to port: " + process.env.PORT);
});
