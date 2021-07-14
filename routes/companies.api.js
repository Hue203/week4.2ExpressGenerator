const express = require("express");
const router = express.Router();

let { companies } = require("../data/data.json");

const admissableFooParams = companies.keys();

router.post("/", (req, res) => {
  const company = {};
  for (const param of admissableFooParams) {
    if (req.body[param]) company[param] = req.body[param];
  }
  jobs.push(company);
  res.send(company);
});

router.patch("/:id", (req, res) => {
  companies = companies.map((company) => {
    if (company.id == req.params.id) {
      company.taken = true;
    }
    return company;
  });

  console.log(companies);

  res.send(companies);
});

router.get("/", (req, res) => {
  let { page, limit } = req.query;
  let data = [];
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  const startIndex = limit * (page - 1);
  const endIndex = page * limit;
  data = companies.slice(startIndex, endIndex);
  console.log("length", data.length);
  res.send(data);
});

router.delete("/:id", (req, res) => {
  companies = companies.reduce((result, company) => {
    if (company.id != req.params.id) {
      result.push(company);
    }
    return result;
  }, []);
  console.log(companies);
  res.send(companies);
});

module.exports = router;
