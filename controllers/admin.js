const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");
const Weapon = require("../models/weapon")(sequelize, DataTypes);
const Ammo = require("../models/ammo")(sequelize, DataTypes);
const User = require("../models/user")(sequelize, DataTypes);

exports.getProfile = async (req, res, next) => {};

exports.createWeapon = async (req, res, next) => {
  const { name, description, weaponType, caliber, price, imageUrl } = req.body;

  try {
    const weapon = Weapon.create({
      name,
      description,
      weaponType,
      caliber,
      price,
      imageUrl,
      userId: req.userId,
    });

    res.status(200).json({ message: "Weapon created successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.updateWeapon = (req, res, next) => {};

exports.deleteWeapon = (req, res, next) => {};

exports.createAmmo = (req, res, next) => {
  const { name, ammoType, quantity, caliber, price, imageUrl } = req.body;

  try {
    const ammo = Ammo.create({
      name,
      ammoType,
      quantity,
      caliber,
      price,
      imageUrl,
      userId: req.userId,
    });

    res.status(200).json({ message: "Ammo created successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.updateAmmo = (req, res, next) => {};

exports.deleteAmmo = (req, res, next) => {};

exports.order = (req, res, next) => {};
