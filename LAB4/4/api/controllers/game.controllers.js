const dbConnection = require("../data/dbConnection");

module.exports = {
  getAll: function (req, res) {
    const db = dbConnection.get();
    const gameCollection = db.collection("games");
    let offset = 0;
    let count = 7;
    if (req.query && req.query.offset) offset = parseInt(req.query.offset);
    if (req.query && req.query.count) count = parseInt(req.query.count);

    gameCollection
      .find()
      .skip(offset)
      .limit(count)
      .toArray(function (err, games) {
        console.log("Found games", games);
        res.status(200).json(games);
      });
  },
  create: function (req, res) {
    const db = dbConnection.get();
    const gameCollection = db.collection("games");

    gameCollection.insertOne(req.body);
    res.status(200).json(req.body);
  },
  getLatestOne: function (req, res) {
    const db = dbConnection.get();
    const gameCollection = db.collection("games");

    gameCollection
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray(function (err, game) {
        res.status(200).json(game);
      });
  },
  delete: function (req, res) {
    try {
      const db = dbConnection.get();
      const gameCollection = db.collection("games");

      gameCollection.deleteOne(req.params);
      res.status(200).json("Delete successfully");
    } catch (e) {
      res.status(500).json("Delete unsuccessfully");
    }
  },
};
