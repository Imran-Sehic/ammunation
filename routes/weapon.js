const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const weaponController = require("../controllers/weapon");
const auth = require("../middlewares/auth");

router.get("/", auth, weaponController.getAllWeapons);

router.post(
  "/",
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
  weaponController.postWeapon
);

router.put(
  "/:weaponId",
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
  weaponController.putWeapon
);

router.get("/:weaponId", auth, weaponController.getSingleWeapon);

router.delete("/:weaponId", auth, weaponController.deleteWeapon);

module.exports = router;
