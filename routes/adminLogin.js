var express = require("express");
const app = require("../app");
var router = express.Router();
// let config = require("../config/config");
// const userHelpers = require("../helpers/userHelpers");


/**
 * TODO: /// hardcoded user name and password ///
 * *  /// User name : admin ///
 * *  /// Password : admin ///
 * * /// 101 status for access to admin page //
 */

const authentication = () => {
  
};

/* GET users listing. */
router.get("/", function (req, res) {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.
  console.log(req.session);
  if (req.session.adminLoginStatus) {
    res.redirect("/admin/dashboard");
  } else {
    res.render("login", { title: "Login-page" });
  }
});

router.post("/", authentication, function (req, res) {
  console.log(req.session);
  res.redirect("/admin/dashboard");
});

module.exports = router;