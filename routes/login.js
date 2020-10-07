var express = require("express");
const app = require("../app");
var router = express.Router();
// let session = require("express-session");

//*? ///session middleware////

/**
 * TODO: /// hardcoded user name and password ///
 * *  /// User name : sidhik ///
 * *  /// Password : letmein ///
 */

////////////////*? validation middleware/////////
const authentication = (req, res, next) => {
  console.log(req.session);
  let userName = req.body.userName;
  let password = req.body.password;
  console.log(`username : ${userName},password : ${password}`);
  if (userName === "sidhik" && password === "letmein") {
    console.log("User validated");
    req.session.logginStatus = true;
    req.session.userName = userName;
    next();
  } else {
    res.render("login", { status: "user does not exist" });
  }
};

/* GET users listing. */
router.get("/", function (req, res) {
  console.log(req.session);
  if (req.session.logginStatus) {
    res.redirect("/home");
  } else {
    res.render("login", { title: "Login-page" });
  }
});

router.post("/", authentication, function (req, res) {
  // console.log(req.session);
  res.redirect("/home");
});
module.exports = router;
