require("dotenv").config();
require("./api/data/dbConnection.js").open();
const express = require("express");
const router = require("./api/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(process.env.PORT, function () {
  console.log("Listening to port: " + process.env.PORT);
});
