var express = require("express");
const app = require("../app");
var router = express.Router();


router.get("/", function (req, res) {
    // console.log(req.session);
    res.render("admin");
  });



  module.exports = router;