require("dotenv").config();
const mongoose = require("mongoose");
const tournaments = mongoose.model("Tournament");

module.exports = {
  getAll: function (req, res) {
    let offset = parseInt(process.env.OFFSET);
    let limit = parseInt(process.env.LIMIT);
    let search = null;
    const maxLimit = parseInt(process.env.MAX_LIMIT);
    const maxOffset = parseInt(process.env.MAX_OFFSET);

    if (req.query && req.query.limit) limit = parseInt(req.query.limit);
    if (req.query && req.query.offset) offset = parseInt(req.query.offset);
    if (maxLimit < limit || maxOffset < offset) {
      res.status(500).json("Limit or offset exceeded");
      return;
    }
    if (req.query && req.query.search) {
      search = {
        name: {
          $regex: req.query.search,
        },
      };
    }

    tournaments
      .find(search)
      .skip(offset)
      .limit(limit)
      .exec(function (err, tournament) {
        res.status(200).json(tournament);
      });
  },
  getOne: function (req, res) {
    tournaments.findById(req.params.id).exec(function (err, tournament) {
      if (!tournament) {
        res.status(404).json("Tournament is not found");
        return;
      }
      res.status(200).json(tournament);
    });
  },
  create: function (req, res) {
    tournaments.create(req.body, function (err, tournament) {
      if (err) {
        res.status(400).json(err);
        return;
      }
      res.status(200).json(tournament);
    });
  },
  update: function (req, res) {
    tournaments.findByIdAndUpdate(
      req.params.id,
      req.body,
      function (err, tournament) {
        if (!tournament) {
          res.status(404).json("Tournament is not found");
          return;
        }
        res.status(200).json("Update successfully");
      }
    );
  },
  delete: function (req, res) {
    tournaments.findByIdAndDelete(req.params.id, function (err, tournament) {
      if (err) {
        res.status(404).json("Tournament is not found");
        return;
      }
      res.status(200).json("Delete successfully");
    });
  },
};
