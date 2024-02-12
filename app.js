const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const { port, mongo_url } = require("./config");
const expressSession = require("express-session");

// Controllers
const index = require("./controllers/indexController");
// routes
const products = require("./routes/products");
const usersRouter = require("./routes/users");
const indexController = require("./controllers/indexController");

//middleware
const authen = require("./middleware/auth");

mongoose.Promise = global.Promise;

mongoose
  .connect(mongo_url, {})
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

global.loggedIn = null;

const app = express();
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  expressSession({
    secret: "node secret",
  })
);

app.get("/", indexController);
app.use("/users", usersRouter);
app.use("/products", authen, products);

module.exports = app;
