const students = require("../data/school.json");

module.exports = {
  getAll: function (req, res) {
    res.status(200).json(students);
  },
  getOne: function (req, res) {
    const id = parseInt(req.params.id);
    const result = students[id - 1] || "Student not found";

    res.status(200).json(result);
  },
};
