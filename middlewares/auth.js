const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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

    req.userId = decodedToken.userId;
    req.user = decodedToken.user;
    req.isAuth = true;
    next();

  } catch (err) {
    const error = new Error("Invalid token!");
    error.code = 401;
    throw error;
  }
};
