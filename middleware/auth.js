const User = require("../models/User");
module.exports = (req, res, next) => {
  User.findById(req.session.userId)
    .then((user) => {
      if (!user) {
        return res.status(403).json({ message: "Not Authen" });
      }
      next();
    })
    .catch((error) => {
      console.log("error", error);
    });
};
