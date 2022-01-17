require("dotenv").config();
require("./api/config/dbConnection");
const express = require("express");
const router = require("./api/router");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(process.env.PORT, function () {
  console.log("Listening port", process.env.PORT);
});
