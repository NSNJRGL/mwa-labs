require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.post("/", function (req, res) {
  res.status(200).json({ hello: "world" });
});

app.listen(process.env.PORT, function () {
  console.log("Listening to port: " + process.env.PORT);
});
