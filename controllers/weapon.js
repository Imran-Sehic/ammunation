const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");
const Weapon = require("../models/weapon")(sequelize, DataTypes);
const User = require("../models/user")(sequelize, DataTypes);

exports.getAllWeapons = async (req, res, next) => {
  try {
    const weapons = await Weapon.findAll();

    res
      .status(200)
      .json({
        message: "Successfully retrieved all weapons!",
        weapons: weapons,
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSingleWeapon = (req, res, next) => {};

exports.buyWeapon = (req, res, next) => {};

exports.removeWeaponFromCart = (req, res, next) => {};
