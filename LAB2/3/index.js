require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
app.set("port", process.env.PORT);

app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"));
console.log("Listening to port: " + app.get("port"));
