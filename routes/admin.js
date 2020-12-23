const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const adminController = require("../controllers/admin");
const auth = require("../middlewares/auth");

router.get("/profile", auth, adminController.getProfile);

router.post(
  "/add-weapon",
  auth,
  [
    body("name")
      .isLength({ min: 4 })
      .withMessage("Weapon name should be at least 4 characters long!")
      .trim(),
    body("price")
      .isLength({ min: 1 })
      .withMessage("a weapon should have a price!")
      .trim(),
    body("description")
      .isLength({ min: 10 })
      .withMessage("Weapon description should be at least 10 characters long!")
      .trim(),
  ],
  adminController.addWeapon
);

router.post(
  "/add-ammo",
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
  adminController.addAmmo
);

router.put(
  "/update-weapon/:weaponId",
  auth,
  [
    body("name")
      .isLength({ min: 4 })
      .withMessage("Weapon name should be at least 4 characters long!")
      .trim(),
    body("price")
      .isLength({ min: 1 })
      .withMessage("ammo should have a price!")
      .trim(),
    body("description")
      .isLength({ min: 10 })
      .withMessage("Weapon description should be at least 10 characters long!")
      .trim(),
  ],
  adminController.updateWeapon
);

router.put(
  "/update-ammo/:ammoId",
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
  adminController.updateAmmo
);

router.delete("/delete-weapon/:weaponId", auth, adminController.deleteWeapon);

router.delete("/delete-ammo/:ammoId", auth, adminController.deleteAmmo);

router.post("/order", auth, adminController.order);

module.exports = router;
