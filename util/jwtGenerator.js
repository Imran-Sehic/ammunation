const jwt = require("jsonwebtoken");

module.exports = (acessSecret, refreshSecret, model) => {
  const accessToken = jwt.sign(
    {
      user: model,
      userId: model.id.toString(),
    },
    process.env.ACCESS_JWT_SECRET,
    { expiresIn: "2m" }
  );

  const refreshToken = jwt.sign(
    {
      user: model,
      userId: model.id.toString(),
    },
    process.env.REFRESH_JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
      accessToken: accessToken,
      refreshToken: refreshToken
  }
};
