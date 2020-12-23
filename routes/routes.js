const express = require("express");
const router = express.Router();
const weaponRoutes = require("./weapon");
const ammoRoutes = require("./ammo");
const authRoutes = require("./auth");
const adminRoutes = require("./admin");

router.use("/auth", authRoutes);
router.use("/weapons", weaponRoutes);
router.use("/ammo", ammoRoutes);
router.use("/admin", adminRoutes);

router.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

module.exports = router;
