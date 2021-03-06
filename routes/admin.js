const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const adminController = require("../controllers/admin");
const auth = require("../middlewares/auth");
const multer = require("multer");
const {fileStorage, fileFilter} = require("../config/multer");

router.get("/profile", auth, adminController.getProfile);

router.get("/cart", auth, adminController.getCart);

router.post(
  "/create-weapon",
  auth,
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("weapon_img", 3),
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
  adminController.createWeapon
);

router.post(
  "/create-ammo",
  auth,
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("ammo_img", 3),
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
  adminController.createAmmo
);

router.put(
  "/update-weapon/:weaponId",
  auth,
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("weapon_img", 3),
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
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("ammo_img", 3),
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

router.get("/order", auth, adminController.order);

router.get("/checkout/success", auth, adminController.checkoutSuccess);

router.get("/checkout/cancel", auth, adminController.checkoutCancel);

module.exports = router;
