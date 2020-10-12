var express = require("express");
var router = express.Router();

let product = [
  {
    movieName: "THE HUNTER",
    language: "English",
    catogery: "Action",
    movieRating: "3/5",
    imgUrl: "/images/The+Hunter_RGB+DVD+Front.jpg",
  },
  {
    movieName: "WAR",
    language: "Hindi",
    catogery: "Action/Adventure",
    movieRating: "3/5",
    imgUrl: "/images/War.jpg",
  },
  {
    movieName: "END-GAME",
    language: "English",
    catogery: "Action",
    movieRating: "4/5",
    imgUrl: "/images/End-Game.png",
  },
  {
    movieName: "SHYLOCK",
    language: "Malayalam",
    catogery: "Action/Comedy",
    movieRating: "3/5",
    imgUrl: "/images/Shylock-malayalam-movie.png",
  },
];

//*? Session handling middleware////
const sessionHandling = (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
  res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
  res.setHeader("Expires", "0"); // Proxies.
  console.log("This is homePage middleware router");
  console.log(req.session.loginStatus);
  if (req.session.loginStatus) {
    next();
  } else {
    console.log(req.session);
    let sessionStatus = req.session.userName;
    console.log(`cookie line no - 39:${sessionStatus}`);
    if (sessionStatus) {
      next();
    } else {
      res.redirect("/");
    }
  }
};

/* POST home page. */
router.get("/", sessionHandling, function (req, res) {
  console.log("This is homePage main router");
  res.render("index", { title: "Home-Page", product: product });
});

router.get("/logout", function (req, res) {
  console.log("This signout root");
  req.session.destroy();
  console.log(req.session);
  res.redirect("/");
  // console.log(req.cookies);

  // res.cookie("sid1", { maxAge: Date.now() }).redirect("/");
});
module.exports = router;
