let createError = require("http-errors");
let express = require("express");
let hbs = require("express-handlebars");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let cors = require("cors");
let session = require("express-session");

let indexRouter = require("./routes/index");
let loginRouter = require("./routes/login");
const { token } = require("morgan");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.engine("hbs", hbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.set("trust proxy", 1);
app.use(
  session({
    name: "sid1",
    secret: "+~5#O&jCQ>[,OjQ",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);
// app.use(
//   "/home",
//   session({
//     name: "sid2",
//     secret: "+~5#O&jCQ>[,OjQ",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       path: "/home",
//       secure: false,
//       httpOnly: true,
//     },
//   })
// );

app.use("/home", indexRouter);
app.use("/", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
// module.exports = session;
