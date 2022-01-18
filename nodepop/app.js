var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const utils = require("./lib/utils");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const LoginController = require("./controllers/LoginController");
const jwtApiAuth = require("./lib/jwtTokenAuthMiddleware");
const multerConf = require("./lib/multerConfigure");
var app = express();

// Connect to the DB
require("./lib/connectMongoose");

// Prueba rápida para ver que funciona i18n

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").__express);

app.locals.title = "NodePOP";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// static files middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(multerConf);

const loginController = new LoginController();

/** API routes */
app.use("/api/anuncios", jwtApiAuth, require("./routes/api/anuncios"));
app.use("/api/tags", require("./routes/api/tags"));
app.post("/api/login", loginController.postJWT);

// i18n setup
const i18n = require("./lib/i18nConfigure");
app.use(i18n.init);

/**
 *  Website routes
 */
app.use("/change-locale", require("./routes/change-locale"));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/anuncios", require("./routes/frontRoutes/anuncios"));
app.use("/tags", require("./routes/frontRoutes/tags"));

// Controllers
// app.get("/login", loginController.index);
// app.post("/login", loginController.post);
// app.get("/logout", loginController.logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  if (utils.isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.render("error");
});

module.exports = app;
