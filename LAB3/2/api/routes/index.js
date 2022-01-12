const express = require("express");
const mathController = require("../controllers/math.controllers");
const router = express.Router();

router.route("/multiply/:id").get(mathController.multiply);

module.exports = router;
