const Ammo = require("../models/ammo");

exports.getAllAmmo = async (req, res, next) => {
  try {
    const ammo = await Ammo.findAll({
      where: { userId: { $not: req.userId } },
    });
    res
      .status(200)
      .json({ message: "Successfully retrieved all ammo!", ammo: ammo });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSingleAmmo = async (req, res, next) => {
  const ammoId = req.params.ammoId;

  try {
    const ammo = await Ammo.findByPk(ammoId);

    if (!ammo) {
      const error = new Error("Ammo with given id not found!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ ammo: ammo });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.buyAmmo = (req, res, next) => {};

exports.removeAmmoFromCart = (req, res, next) => {};
