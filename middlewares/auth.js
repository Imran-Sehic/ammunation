const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authorized!");
      error.code = 401;
      return next(error);
    }

    const token = authHeader.split(" ")[1];

    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      req.isAuth = false;
    }

    const user = await User.findByPk(decodedToken.userId);

    if(!user) {
      const error = new Error("No user with given id was found!");
      error.statusCode = 404;
      throw error;
    }

    req.userId = decodedToken.userId;
    req.user = user;
    req.isAuth = true;
    next();

  } catch (err) {
    const error = new Error("Invalid token!");
    error.statusCode = 401;
    next(error);
  }
};
