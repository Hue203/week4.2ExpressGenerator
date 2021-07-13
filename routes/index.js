var express = require("express");
var router = express.Router();

/* Jobs Api */
const jobApi = require("./job.api");
router.use("/jobs", jobApi);
module.exports = router;

/* companies Api */
