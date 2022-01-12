const express = require("express");
const studentsController = require("../controllers/student.controllers");
const router = express.Router();

router.route("/students").get(studentsController.getAll);
router.route("/students/:id").get(studentsController.getOne);

module.exports = router;
