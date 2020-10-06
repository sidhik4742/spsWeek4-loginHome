var express = require("express");
var router = express.Router();

/**
 * TODO: /// hardcoded user name and password ///
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
    console.log("User validated");
    next();
  } else {
    res.render("login", { status: "user does not exist" });
  }
};

/* GET users listing. */
router.get("/", function (req, res) {
  res.render("login", { title: "Login-page" });
});

router.post("/", authentication, function (req, res) {
  res.redirect("/home");
});
module.exports = router;
