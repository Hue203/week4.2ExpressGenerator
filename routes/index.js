const express = require("express");
const router = express.Router();

//// jobsApi
const jobsApi = require("./job.api");
router.use("/jobs", jobsApi);

///companiesApi

const companyApi = require("./companies.api");
router.use("/companies", companyApi);
module.exports = router;
