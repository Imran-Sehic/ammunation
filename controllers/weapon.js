const Weapon = require("../models/weapon");
const User = require("../models/user");

exports.getAllWeapons = async (req, res, next) => {
  try {
    const weapons = await Weapon.findAll({
      where: { userId: { $not: req.userId } },
    });

    res.status(200).json({
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
const weaponId = req.params.weaponId;

try {
  const weapon = await Weapon.findByPk(weaponId);

  if (!weapon) {
    const error = new Error("Weapon with given id not found!");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ weapon: weapon });
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
}

exports.buyWeapon = (req, res, next) => {};

exports.removeWeaponFromCart = (req, res, next) => {};
