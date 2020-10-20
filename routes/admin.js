var express = require("express");
const app = require("../app");
var router = express.Router();
const userHelpers = require("../helpers/userHelpers");

const configDashboard = (req, res, next) => {
  if (req.session.adminLoginStatus) {
    userHelpers.findUserDetailsForAdmin((result) => {
      if (result) {
        console.log(result);
        next();
      } else {
        console.log("Collection is empty");
      }
    });
  } else {
    res.redirect("/");
  }
};

router.get("/", configDashboard, function (req, res) {
  // console.log(req.session);
  res.render("admin", { title: "admin-page" });
});

module.exports = router;
