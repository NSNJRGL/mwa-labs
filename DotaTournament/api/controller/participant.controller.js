const mongoose = require("mongoose");
const tournaments = mongoose.model("Tournament");

module.exports = {
  getAll: function (req, res) {
    let offset = parseInt(process.env.OFFSET);
    let limit = parseInt(process.env.LIMIT);
    const maxLimit = parseInt(process.env.MAX_LIMIT);
    const maxOffset = parseInt(process.env.MAX_OFFSET);

    if (req.query && req.query.limit) limit = parseInt(req.query.limit);
    if (req.query && req.query.offset) offset = parseInt(req.query.offset);
    if (maxLimit < limit || maxOffset < offset) {
      res.status(500).json("Limit or offset exceeded");
      return;
    }

    tournaments
      .findById(req.params.id)
      .select("participants")
      .skip(offset)
      .limit(limit)
      .exec(function (err, tournament) {
        if (!tournament) {
          res.status(404).json("Tournament is not found");
          return;
        }

        res.status(200).json(tournament);
      });
  },
  getOne: function (req, res) {
    tournaments.findById(req.params.id).exec(function (err, tournament) {
      if (!tournament) {
        res.status(404).json("Tournament is not found");
        return;
      }

      const participant = tournament.participants.id(req.params.participant_id);
      if (!participant) {
        res.status(404).json("Participant is not found");
        return;
      }
      res.status(200).json(participant);
    });
  },
  create: function (req, res) {
    tournaments.findById(req.params.id).exec(function (err, tournament) {
      if (!tournament) {
        res.status(404).json("Tournament is not found");
        return;
      }
      const participants = tournament.participants;
      participants.set(req.body);
      tournament.save(function () {
        res.status(200).json("Update successfully");
      });
    });
  },
  update: function (req, res) {
    tournaments.findById(req.params.id).exec(function (err, tournament) {
      if (!tournament) {
        res.status(404).json("Tournament is not found");
        return;
      }

      const participant = tournament.participants.id(req.params.participant_id);
      if (!participant) {
        res.status(404).json("Participant is not found");
        return;
      }
      participant.set(req.body);
      tournament.save(function () {
        res.status(200).json("Update successfully");
      });
    });
  },
  delete: function (req, res) {
    tournaments.findById(req.params.id).exec(function (err, tournament) {
      if (!tournament) {
        res.status(404).json("Tournament is not found");
        return;
      }
      const participant = tournament.participants.id(req.params.participant_id);
      if (!participant) {
        res.status(404).json("Participant is not found");
        return;
      }
      participant.remove();
      tournament.save(function () {
        res.status(200).json("Delete successfully");
      });
    });
  },
};
