const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authController = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("firstname").trim().not().isEmpty().withMessage("Firstname should not be empty!"),
    body("lastname").trim().not().isEmpty().withMessage("Lastname should not be empty!"),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage(
        "Password should be 8 characters long at least!"
      ),
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
