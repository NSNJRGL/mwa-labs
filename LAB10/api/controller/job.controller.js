require("dotenv").config();
const mongoose = require("mongoose");
const Job = mongoose.model("Job");

const _runGeoQuery = function (req, res) {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const point = { type: "Point", coordinates: [lng, lat] };

  const query = {
    "location.coordinates": {
      $near: {
        $geometry: point,
        $maxDistance: parseFloat(process.env.MAX_DIST, 10),
        $minDistance: parseFloat(process.env.MIN_DIST, 10),
      },
    },
  };

  Job.find(query)
    .limit(parseInt(process.env.DEFAULT_FIND_COUNT))
    .exec(function (err, jobs) {
      if (err) {
        res.status(200).json(err);
        return;
      }

      res.status(200).json(jobs);
    });
};

module.exports = {
  getAll: function (req, res) {
    let limit = 5;
    let offset = 0;
    let maxLimit = 20;

    if (req.query && req.query.limit) limit = parseInt(req.query.limit);
    if (req.query && req.query.offset) offset = parseInt(req.query.offset);
    if (isNaN(offset) || isNaN(limit)) {
      res.status(400).json({ message: "Offset and limit should be a number" });
      return;
    }

    if (maxLimit < limit) {
      res.status(200).json("Limit is reached");
      return;
    }

    if (req.query && req.query.lat && req.query.lng) {
      _runGeoQuery(req, res);
      return;
    }

    Job.find()
      .skip(offset)
      .limit(limit)
      .exec(function (err, jobs) {
        res.status(200).json(jobs);
      });
  },
  getOne: function (req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(500).json("Id is not right");
      return;
    }

    Job.findById(req.params.id).exec(function (err, job) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      if (job === null) {
        res.status(404).json("Not found");
        return;
      }

      res.status(200).json(job);
    });
  },
  create: function (req, res) {
    Job.create(req.body, function (err, game) {
      if (err) {
        res.status(500).json(err);
        return;
      }

      res.status(200).json(game);
    });
  },
  delete: function (req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(500).json("Id is not right");
      return;
    }

    Job.findByIdAndDelete(req.params.id, function (err, game) {
      if (game === null) {
        res.status(404).json("Game not found");
        return;
      }

      res.status(200).json("Job deleted successfully");
    });
  },
  update: function (req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(500).json("Id is not right");
      return;
    }

    Job.findByIdAndUpdate(req.params.id, { $set: req.body }).exec(function (
      err,
      game
    ) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      if (game === null) {
        res.status(404).json("Not found");
        return;
      }

      res.status(200).json("Successfully updated");
    });
  },
};
