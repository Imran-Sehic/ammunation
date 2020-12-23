const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const ammoController = require("../controllers/ammo");
const auth = require("../middlewares/auth");

router.get("/", auth, ammoController.getAllAmmo);

router.get("/:ammoId", auth, ammoController.getSingleAmmo);

router.post("/:ammoId", auth, ammoController.buyAmmo);

router.delete("/:ammoId", auth, ammoController.removeAmmoFromCart);

module.exports = router;
