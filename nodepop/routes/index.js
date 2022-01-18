var express = require("express");
var router = express.Router();
const { query, param, validationResult } = require("express-validator");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Nodepop" });
});

module.exports = router;
