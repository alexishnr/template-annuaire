const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const compression = require("compression");
const app = express();
const secure = require("express-force-https");
const projectConfig = require("./config/config").configProject;
require("dotenv").config();
const website = projectConfig.website;
const professionnelFormatted = projectConfig.professionnelFormatted;
const metas = require("./config/config").metas;
const ejsLayout = require("express-ejs-layouts");

// force ssl
app.use(secure);
// compress all responses
app.use(compression());

// view engine setup

app.use(ejsLayout);
// Static
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
  res.render("error", {
    isBannerDisplayed: false,
    website,
    professionnelFormatted,
    metas: metas?.error,
  });
});

module.exports = app;
