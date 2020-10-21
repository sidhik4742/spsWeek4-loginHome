var express = require("express");
const app = require("../app");
var router = express.Router();
const userHelpers = require("../helpers/userHelpers");

const configDashboard = (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.
  if (req.session.adminLoginStatus) {
    userHelpers.findUserDetailsForAdmin((result) => {
      if (result) {
        // console.log(result);
        res.locals.result = result;
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
  console.log(req.session);
  if (req.session.adminLoginStatus) {
    let result = res.locals.result;
    console.log(result);
    res.render("admin", {
      title: "admin-page",
      result: result,
      editUserData: req.session.editUserData,
      addUserWarning: req.session.addUserWarning,
    });
    req.session.editUserData = undefined;
    req.session.addUserWarning = undefined;
  } else {
    res.redirect("/admin");
  }
});

router.get("/logout", function (req, res) {
  console.log("This signout root");
  req.session.adminLoginStatus = null;
  console.log(req.session);
  res.redirect("/admin");
  // console.log(req.cookies);

  // res.cookie("sid1", { maxAge: Date.now() }).redirect("/");
});

router.get("/delete", function (req, res) {
  let id = req.query.id;
  console.log("id : " + id);
  userHelpers.deleteUser(id, (result) => {
    console.log(result.result);
    res.redirect("/admin/dashboard");
  });
});

router.get("/edit", function (req, res) {
  let id = req.query.id;
  console.log("id : " + id);
  req.session.editUserId = id;
  userHelpers.editUser(id, (result) => {
    console.log(result);
    req.session.editUserData = result;
    res.redirect("/admin/dashboard");
  });
});
router.post("/edit", function (req, res) {
  let id = req.session.editUserId;
  console.log(req.body);
  userHelpers.updateUser(id, req.body, (result) => {
    console.log(result);
    if (result) {
      req.session.editUserId = undefined;
      res.redirect("/admin/dashboard");
    } else {
      console.log("updation failed");
    }
    // req.session.editUserData = result;
  });
});
router.post("/add", function (req, res) {
  console.log(req.body);
  userHelpers.addUser(req.body, (result) => {
    console.log(result);
    if (result.status === 200) {
      res.redirect("/admin/dashboard");
    } else {
      req.session.addUserWarning = "User already registered";
      res.redirect("/admin/dashboard");
    }
  });
});

router.post("/search", function (req, res) {
  console.log(req.body);
  userHelpers.searchUser(req.body, (result) => {
    // req.session.searchedData = result;
    res.render("admin", { result: result });
  });
});

module.exports = router;
