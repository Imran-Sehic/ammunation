const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");
const Ammo = require("../models/ammo")(sequelize, DataTypes);

exports.getAllAmmo = async (req, res, next) => {
  try {
    const ammo = await Ammo.findAll();
    res
      .staus(200)
      .json({ message: "Successfully retrieved all ammo!", ammo: ammo });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSingleAmmo = (req, res, next) => {};

exports.buyAmmo = (req, res, next) => {};

exports.removeAmmoFromCart = (req, res, next) => {};
