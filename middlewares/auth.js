const jwt = require("jsonwebtoken");
const tokensGenerator = require("../util/jwtGenerator");
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

    let decodedToken = jwt.verify(token, process.env.ACCESS_JWT_SECRET);

    const user = await User.findByPk(decodedToken.userId);

    if (!user) {
      const error = new Error("No user with given id was found!");
      error.statusCode = 404;
      throw error;
    }

    req.userId = decodedToken.userId;
    req.user = user;
    next();
  } catch (err) {
    const refresh = req.get("X-Refresh");

    if (!refresh) {
      const error = new Error("No refresh token header!");
      error.statusCode = 404;
      return next(error);
    }

    jwt.verify(refresh, process.env.REFRESH_JWT_SECRET, (err, done) => {
      if(err) {
        const error = new Error("Unable to verify refresh token!");
        error.statusCode = 500;
        return next(error);
      } else {
        const tokens = tokensGenerator(
          process.env.ACCESS_JWT_SECRET,
          process.env.REFRESH_JWT_SECRET,
          done.user
        );

        res.status(200).json({token: tokens.accessToken, refresh: tokens.refreshToken});
      }
    });
  }
};
