var express = require("express");
var router = express.Router();

/**
 * TODO /// hardcoded user name and password ///
 * *  /// User name : sidhik ///
 * *  /// Password : letmein ///
 */

////////////////*? validation middleware/////////
const authentication = (req, res, next) => {
  // console.log(req.body);
  let userName = req.body.userName;
  let password = req.body.password;
  console.log(`username : ${userName},password : ${password}`);
  if (userName === "sidhik" && password === "letmein") {
    next();
  } else {
    res.render("login", { status: "user not logged" });
  }
};

/* POST home page. */
router.post("/", authentication, function (req, res, next) {
  res.render("index", { title: "Home-Page" });
});

module.exports = router;
