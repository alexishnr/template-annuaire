const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const compression = require("compression");
const app = express();
const secure = require("express-force-https");
const professionnel = require("./config/config").configProject.professionnel;
// force ssl
app.use(secure);
// compress all responses
app.use(compression());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// Static
app.use(express.static(path.join(__dirname, "public")));
app.use(
  `/:${professionnel}/:ville/:name/`,
  express.static(path.join(__dirname, "public"))
);

app.use(
  `/:${professionnel}/:ville/:name/avis/`,
  express.static(path.join(__dirname, "public"))
);

app.use(
  `/:${professionnel}/:ville/:name/avis/:error?/`,
  express.static(path.join(__dirname, "public"))
);

app.use("/blog/:name/", express.static(path.join(__dirname, "public")));
app.use("/blog/", express.static(path.join(__dirname, "public")));
app.use("/contact/", express.static(path.join(__dirname, "public")));
app.use("/regions/", express.static(path.join(__dirname, "public")));

app.use("/regions/:region/", express.static(path.join(__dirname, "public")));
app.use(
  `/:${professionnel}/:company/`,
  express.static(path.join(__dirname, "public"))
);

app.use(
  `/:${professionnel}/:PlaceToSearch/`,
  express.static(path.join(__dirname, "public"))
);

app.use("/mutuelle/", express.static(path.join(__dirname, "public")));

app.use("/blog/mutuelle/", express.static(path.join(__dirname, "public")));

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/error/", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.set("views", "views");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(res.locals.error);
  // render the error page
  res.status(err.status || 500);
  res.render("error", { isBannerDisplayed: false });
});

module.exports = app;
