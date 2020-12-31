const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const path = require("path");
const ejs = require("ejs");
const tokensGenerator = require("../util/jwtGenerator");
const User = require("../models/user");
const WeaponCart = require("../models/weapon_cart");
const AmmoCart = require("../models/ammo_cart");

exports.signup = async (req, res, next) => {
  const { firstname, lastname, birth_date, password, email } = req.body;
  const profile_img = req.file;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  if (!profile_img) {
    const error = new Error("No profile image was selected!");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const userWithEmail = await User.findOne({ where: { email: email } });

    if (userWithEmail) {
      const error = new Error("User with given email already exists!");
      error.statusCode = 422;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const savedUser = await User.create({
      firstname,
      lastname,
      birth_date,
      password: hashedPassword,
      email,
      profile_img: profile_img.path,
    });

    savedUser.createWeapon_cart();
    savedUser.createAmmo_cart();

    const token = jwt.sign(
      {
        email: savedUser.email,
        userId: savedUser.id.toString(),
      },
      process.env.EMAIL_JWT_SECRET,
      { expiresIn: "1d" }
    );

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ammunation.web.store@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const html = await ejs.renderFile(
      path.join(__dirname, "..", "templates", "verificationEmail.ejs"),
      { token: token }
    );

    if (!html) {
      const error = new Error("Unable to read html!");
      error.statusCode = 500;
      throw error;
    }

    let mailOptions = {
      from: '"Ammunation Store" <ammunation.web.store@gmail.com>',
      to: email,
      subject: "Account verification",
      html: html,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
          return next(err);
        }
      } else {
        res.status(200).json({
          message: "successfully created user, now verify account!",
        });
      }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      const error = new Error("No user with given email was found!");
      error.statusCode = 404;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    if (!user.verified) {
      const error = new Error("Your account is not verified!");
      error.statusCode = 403;
      throw error;
    }

    tokens = tokensGenerator(
      process.env.ACCESS_JWT_SECRET,
      process.env.REFRESH_JWT_SECRET,
      user
    );

    res
      .status(200)
      .json({
        token: tokens.accessToken,
        refresh: tokens.refreshToken,
        userId: user.id.toString(),
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.verify = async (req, res, next) => {
  const token = req.params.token;

  try {
    let decodedToken = jwt.verify(token, process.env.EMAIL_JWT_SECRET);
    if (!decodedToken) {
      const error = new Error("Invalid token!");
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findOne({ where: { email: decodedToken.email } });

    if (!user) {
      const error = new Error("No user found!");
      error.statusCode = 404;
      throw error;
    }

    user.verified = true;
    await user.save();

    res.redirect("https://www.google.com");
    //res.status(200).json({ message: "Account verified successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};
