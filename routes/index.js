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
    MovieName: "WAR",
    language: "Hindi",
    Catogery: "Action",
    MovieRating: "3/5",
    imgUrl: "/images/War.jpg",
  },
  {
    MovieName: "END-GAME",
    language: "English",
    Catogery: "Action",
    MovieRating: "4/5",
    imgUrl: "/images/End-Game.png",
  },
  {
    MovieName: "SHYLOCK",
    language: "Malayalam",
    Catogery: "Action/Comedy",
    MovieRating: "3/5",
    imgUrl: "/images/Shylock-malayalam-movie.png",
  },
];

//*? Session handling middleware////
const sessionHandling = (req, res, next) => {
  console.log("This is homePage middleware router");
  console.log(req.session.loginStatus);
  if (req.session.loginStatus) {
    res.redirect("/home");
  } else {
    console.log(req.session);
    let sessionStatus = req.session.userName;
    console.log(`cookie line no - 39:${sessionStatus}`);
    if (sessionStatus) {
      next();
    } else {
      res.redirect("/");
      // res.redirect("/");
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
  res.redirect("/");
  console.log(req.session);
  // console.log(req.cookies);

  // res.cookie("sid1", { maxAge: Date.now() }).redirect("/");
});
module.exports = router;
