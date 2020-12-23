const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const weaponController = require("../controllers/weapon");
const auth = require("../middlewares/auth");

router.get("/", auth, weaponController.getAllWeapons);

router.get("/:weaponId", auth, weaponController.getSingleWeapon);

router.post("/:weaponId", auth, weaponController.buyWeapon);

router.delete("/:weaponId", auth, weaponController.removeWeaponFromCart);

module.exports = router;
