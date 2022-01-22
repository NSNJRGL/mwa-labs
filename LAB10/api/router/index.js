const express = require("express");
const jobsController = require("../controller/job.controller");
const router = express.Router();

router.route("/jobs").get(jobsController.getAll).post(jobsController.create);
router
  .route("/jobs/:id")
  .get(jobsController.getOne)
  .delete(jobsController.delete)
  .put(jobsController.update);

module.exports = router;
