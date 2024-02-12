const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/user");
const User = require("../models/User");
/* GET users */
router.get("/", function (req, res, next) {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => next(error));
});

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
