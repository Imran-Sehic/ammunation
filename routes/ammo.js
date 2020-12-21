const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const ammoController = require("../controllers/ammo");
const auth = require("../middlewares/auth");

router.get("/", auth, ammoController.getAllAmmo);

router.post(
  "/",
  auth,
  [
    body("name")
      .isLength({ min: 4 })
      .withMessage("ammo name should be at least 4 characters long!")
      .trim(),
    body("quantity")
      .isLength({ min: 5 })
      .withMessage("ammo packet should contain at least 5 rounds!")
      .trim(),
    body("price")
      .isLength({ min: 1 })
      .withMessage("ammo should have a price!")
      .trim(),
  ],
  ammoController.postAmmo
);

router.put(
  "/:ammoId",
  auth,
  [
    body("name")
      .isLength({ min: 4 })
      .withMessage("ammo name should be at least 4 characters long!")
      .trim(),
    body("quantity")
      .isLength({ min: 5 })
      .withMessage("ammo packet should contain at least 5 rounds!")
      .trim(),
    body("price")
      .isLength({ min: 1 })
      .withMessage("ammo should have a price!")
      .trim(),
  ],
  ammoController.putAmmo
);

router.get("/:ammoId", auth, ammoController.getSingleAmmo);

router.delete("/:ammoId", auth, ammoController.deleteAmmo);

module.exports = router;
