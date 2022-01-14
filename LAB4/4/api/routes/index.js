const express = require("express");
const gameController = require("../controllers/game.controllers");
const router = express.Router();

router.route("/games").get(gameController.getAll);
router.route("/games/create").post(gameController.create);
router.route("/games/latest").get(gameController.getLatestOne);
router.route("/games/delete/:title").delete(gameController.delete);

module.exports = router;
