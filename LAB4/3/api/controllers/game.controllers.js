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
};
