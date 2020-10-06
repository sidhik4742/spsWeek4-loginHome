var express = require("express");
var router = express.Router();

// ////////////////*? logOut middleware/////////
// const logOut = (req, res, next) => {
//   let logout = req
// };

/* POST home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Home-Page" });
});

router.post("/logout", function (req, res) {
  console.log("This this signout root");
  res.redirect("/");
});
module.exports = router;
