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
      res.render("login", { noUserStatus: true });
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
module.exports = router;

// router.post("/nouser", authentication, function (req, res) {
//   res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
//   res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
//   res.setHeader("Expires", "0"); // Proxies.
//   console.log(req.session);
//   res.redirect("/");
// });
