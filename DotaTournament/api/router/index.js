const express = require("express");
const tournamentsRoute = require("./routers.constant");
const tournamentController = require("../controller/tournament.controller");
const participantController = require("../controller/participant.controller");
const router = express.Router();

// Tournaments
router
  .route(tournamentsRoute.TOURNAMENTS)
  .get(tournamentController.getAll)
  .post(tournamentController.create);
// TournamentDetail
router
  .route(tournamentsRoute.TOURNAMENT_DETAIL)
  .get(tournamentController.getOne)
  .put(tournamentController.update)
  .delete(tournamentController.delete);

// Participants
router
  .route(tournamentsRoute.PARTICIPANTS)
  .get(participantController.getAll)
  .post(participantController.create);
// Participants detail
router
  .route(tournamentsRoute.PARTICIPANTS_DETAIL)
  .get(participantController.getOne)
  .put(participantController.update)
  .delete(participantController.delete);

module.exports = router;
