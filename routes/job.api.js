const express = require("express");
const router = express.Router();

const { jobs } = require("../data/data.json");

/**
 * @router POST api/jobs
 */


 app.post("/jobs", (req, res) => {
  jobs.push({ ...req.body });
  res.send("Create item in job success");
});
/**
 * @router GET api/jobs
 *

 router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
