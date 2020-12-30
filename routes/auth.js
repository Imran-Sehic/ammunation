const express = require("express");
const router = express.Router();
const multer = require("multer");
const {fileStorage, fileFilter} = require("../config/multer");
const { body, validationResult } = require("express-validator");
const authController = require("../controllers/auth");

router.post(
  "/signup",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("profile_img"),
  [
    body("firstname")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Firstname should not be empty!"),
    body("lastname")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Lastname should not be empty!"),
    body("birth_date")
      .not()
      .isEmpty()
      .custom((date) => {
        const birthDate = new Date(date.toString());
        const actualDate = new Date();
        const differenceInMillis = actualDate - birthDate;
        const age = Math.floor(differenceInMillis / 31556952000);

        if (age < 18) {
          return Promise.reject("You should be at least 18 years old!");
        }

        return true;
      }),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password should be 8 characters long at least!"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email should be of a valid format!")
      .normalizeEmail(),
  ],
  authController.signup
);

router.post("/login", authController.login);

router.get("/verification/:token", authController.verify);

module.exports = router;
