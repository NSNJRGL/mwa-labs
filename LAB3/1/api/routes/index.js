const express = require("express");
const gameController = require("../controllers/game.controllers");
const router = express.Router();

router.route("/games").get(gameController.getAll);

module.exports = router;
