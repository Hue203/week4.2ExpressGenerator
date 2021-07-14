const express = require("express");
require("dotenv").config();
const cors = require("cors");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let indexRouter = require("./routes/index");

function pagination(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const start = (page - 1) * limit;
  const end = page * limit;
  req.start = start;
  req.end = end;
  req.limit = 3;
  req.id = req.params.id;
  next();
}
let app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

module.exports = app;
