const bcrypt = require("bcrypt");
const User = require("../models/User");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new Error("Email and password are required"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: "Error creating user" }); // Send user-friendly message
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      let compare = bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          req.session.userId = user._id;
          loggedIn = req.session.userId;
          res.json({ message: "User logged in" });
        } else {
          res.status(400).json({ message: "Invalid credentials" });
        }
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  });
};

const logout = async (req, res, next) => {
  req.session.destroy(() => {
    loggedIn = null;
    res.json({ message: "logut complate" });
  });
};

module.exports = { register, login, logout };
