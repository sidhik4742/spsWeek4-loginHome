var express = require("express");
const app = require("../app");
var router = express.Router();
// let config = require("../config/config");
const userHelpers = require("../helpers/userHelpers");
// let session = require("express-session");

////////////////*? validation middleware/////////
const authentication = (req, res, next) => {
  console.log(req.body);
  // res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  // res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  // res.setHeader("Expires", "0"); // Proxies.
  console.log(req.session);
  // if (req.body.userName === "admin" && req.body.password === "admin") {
  //   console.log("this is admin page");
  //   req.session.adminLoginStatus = true;
  //   res.send({ status: 101, message: "render to admin page" });
  //   return true;
  // }
  if (req.session.loginStatus) {
    next();
  } else {
    userHelpers.findUserDetails(req.body, (result) => {
      console.log(`route result is :  ${result.message}`);
      // res.send({ result });
      if (result.status) {
        console.log("User validated");
        req.session.loginStatus = true;
        console.log(req.sessionID);
        res.send(result);
      } else {
        console.log("responce with a message invalid user");
        res.send(result);
      }
    });

    // if (userName === "sidhik" && password === "letmein") {
    //   req.session.userName = userName;
    // } else {
    //   // res.render("login", { noUserStatus: true });
    //   // res.send("not a valid user")
    //   return true;
    // }
  }
};

router.get("/", function (req, res) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.
  console.log(req.session);
  res.redirect("/login");
});

/* GET users listing. */
router.get("/login", function (req, res) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.
  console.log(req.session);
  if (req.session.loginStatus) {
    res.redirect("/home");
  } else {
    // res.redirect("/userlogin")
    res.render("login", { title: "Login-page" });
  }
});

router.post("/", authentication, function (req, res) {
  console.log(req.session);
  res.redirect("/home");
});

router.post("/register", function (req, res) {
  console.log(req.session);
  userHelpers.insertUserDetail(req.body, (result) => {
    console.log(`route result is :  ${result.message}`);
    res.send({ result });
  });
});

module.exports = router;
