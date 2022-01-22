require("dotenv").config();
require("./api/config/db");
const express = require("express");
const router = require("./api/router");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,PUT,DELETE");
  next();
});
app.use("/api", router);

app.listen(process.env.PORT, function () {
  console.log("Started server" + process.env.PORT);
});
