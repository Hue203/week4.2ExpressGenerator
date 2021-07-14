const express = require("express");
const router = express.Router();
let { jobs, companies } = require("../data/data.json");

//CRUD Job
//Create

const admissableFooParams = jobs.keys();

router.post("/", (req, res) => {
  const job = {};
  for (const param of admissableFooParams) {
    if (req.body[param]) job[param] = req.body[param];
  }
  jobs.push(job);
  res.send(job);
});

router.patch("/:id", (req, res) => {
  jobs = jobs.map((job) => {
    if (job.id == req.params.id) {
      job.taken = true;
    }
    return job;
  });

  console.log(jobs);

  res.send(jobs);
});

function findCompanyName(companyId) {
  return companies.find((company) => company.id === companyId).name;
}

router.get("/", (req, res) => {
  let { page, limit, companyName, title, city, skills, ...rest } = {
    ...req.query,
  };
  console.log("rest", rest);
  let data = [];
  if (companyName) {
    let filteredJob = jobs.filter((job) => {
      return findCompanyName(job.companyId) === req.query.companyName;
    });
    data.push(filteredJob);
  }

  if (title) {
    let filteredJob = jobs.filter((job) => job.title.includes(title));
    data.push(filteredJob);
  }

  if (city) {
    let filteredJob = jobs.filter((job) => job.city.includes(city));
    data.push(filteredJob);
  }

  if (skills) {
    console.log("skill", skills);
    let filteredJob = jobs.filter((job) =>
      job.skills.filter((s) => s.includes(skills))
    );

    data.push(filteredJob);
  }

  /* Pagination for Categories */
  if (page || limit) {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 3;
    const startIndex = limit * (page - 1);
    const endIndex = page * limit;
    data = jobs.slice(startIndex, endIndex);
  }

  res.send(data);
});

router.delete("/:id", (req, res) => {
  jobs = jobs.reduce((result, job) => {
    if (job.id != req.params.id) {
      result.push(job);
    }
    return result;
  }, []);

  console.log(jobs);
  res.send(jobs);
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// let { jobs, companies } = require("../data/data.json");

// /**
//  * @router POST api/jobs
//  */

// router.post("/jobs", (req, res, next) => {
//   jobs.push({ ...req.body });
//   res.send("Create item in job success");
// });
// /**
//  * @router GET api/jobs
//  */
// function findCompanyName(companyId) {
//   return companies.find((company) => company.id === companyId).name;
// }
// router.get("/", async (req, res, next) => {
//   try {
//     let { page, limit, city, companyName, title, skills } = { ...req.query };
//     if (page || limit) {
//       const page = parseInt(page) || 1;
//       const limit = parseInt(limit) || 1;
//       const startIndex = limit * (page - 1);
//       const endIndex = page * limit;
//     }
//     let filterJob = [];
//     if (companyName) {
//       let companyQuery = jobs.filter((job) => {
//         const isMatchingCompanyName =
//           findCompanyName(job.companyId) === req.query.companyName;
//         return job[param] === req.query[param] && isMatchingCompanyName;
//       });
//     }
//     res.status(200).send(jobs);
//     console.log("object", jobs);
//   } catch (err) {
//     console.log("Errr", err);
//     res.status(404).send(err);
//   }
//   next();
// });

// module.exports = router;
