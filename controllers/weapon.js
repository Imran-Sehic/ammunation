const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");
const Weapon = require("../models/weapon")(sequelize, DataTypes);
const User = require("../models/user")(sequelize, DataTypes);

exports.getAllWeapons = async (req, res, next) => {
  try {
    const weapons = await Weapon.findAll();

    res.status(200).json({ weapons: weapons });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postWeapon = async (req, res, next) => {
  const { name, description, weaponType, caliber, price, imageUrl } = req.body;

  try {
    const user = await User.findByPk(req.userId);

    if(!user) {
      const error = new Error("No user with given id was found!");
      error.statusCode = 404;
      throw error;
    }

    await user.createWeapon({
      name,
      description,
      weaponType,
      caliber,
      price,
      imageUrl,
    });

    res.status(201).json({ message: "weapon created!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putWeapon = (req, res, next) => {};

exports.getSingleWeapon = (req, res, next) => {};

exports.deleteWeapon = (req, res, next) => {};
