const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");
const Ammo = require("../models/ammo")(sequelize, DataTypes);

exports.getAllAmmo = async (req, res, next) => {
  try {
    const ammo = await Ammo.findAll();
    res.staus(200).json({ ammo: ammo });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postAmmo = (req, res, next) => {};

exports.putAmmo = (req, res, next) => {};

exports.getSingleAmmo = (req, res, next) => {};

exports.deleteAmmo = (req, res, next) => {};
