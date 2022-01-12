require("dotenv").config();
const express = require("express");
const path = require("path");
const router = require("./api/routes");
const app = express();

app.use(function (req, res, next) {
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", router);

app.listen(process.env.PORT, function () {
  console.log("Listening to port: " + process.env.PORT);
});
