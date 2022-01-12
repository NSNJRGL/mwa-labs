const games = require("../data/games.json");

module.exports = {
  getAll: function (req, res) {
    res.status(200).json(games);
  },
};
