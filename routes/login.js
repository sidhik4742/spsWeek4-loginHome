var express = require("express");
const app = require("../app");
var router = express.Router();
let config = require("../config/config");
let userHelpers = require("../helpers/userHelpers");
// let session = require("express-session");

//*? ///session middleware////

/**
 * TODO: /// hardcoded user name and password ///
 * *  /// User name : sidhik ///
 * *  /// Password : letmein ///
 */

////////////////*? validation middleware/////////
const authentication = (req, res, next) => {
  console.log(req.body);
  // res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  // res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  // res.setHeader("Expires", "0"); // Proxies.
  console.log(req.session);
  let userName = req.body.userName;
  let password = req.body.password;
  if (req.session.loginStatus) {
    next();
  } else {
    console.log(`username : ${userName},password : ${password}`);
    if (userName === "sidhik" && password === "letmein") {
      console.log("User validated");
      req.session.loginStatus = true;
      req.session.userName = userName;
      next();
    } else {
      console.log("responce with a message invalid user");
      // res.render("login", { noUserStatus: true });
      res.send(false);
      // res.send("not a valid user")
      return true;
    }
  }
};

/* GET users listing. */
router.get("/", function (req, res) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.
  console.log(req.session);
  if (req.session.loginStatus) {
    res.redirect("/home");
  } else {
    res.render("login", { title: "Login-page" });
  }
});

router.post("/", authentication, function (req, res) {
  console.log(req.session);
  res.redirect("/home");
});

router.post("/register", function (req, res) {
  console.log(req.session);
  userHelpers.insertUserDetail(req.body);
  res.send({ status: true, message: "success" });
});

module.exports = router;
