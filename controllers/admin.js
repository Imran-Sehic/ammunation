const Weapon = require("../models/weapon");
const Ammo = require("../models/ammo");
const User = require("../models/user");
const WeaponCart = require("../models/weapon_cart");
const AmmoCart = require("../models/ammo_cart");
const WeaponCartItem = require("../models/weapon_cart_item");
const AmmoCartItem = require("../models/ammo_cart_item");

exports.getProfile = async (req, res, next) => {};

exports.getCart = async (req, res, next) => {
  try {
    const weaponCart = await req.user.getWeapon_cart();
    const ammoCart = await req.user.getAmmo_cart();

    const cartWeapons = await weaponCart.getWeapons();
    const cartAmmos = await ammoCart.getAmmos();

    res.status(200).json({ ammos: cartAmmos, weapons: cartWeapons });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.createWeapon = (req, res, next) => {
  const { name, description, weaponType, caliber, price, imageUrl } = req.body;

  try {
    req.user.createWeapon({
      name,
      description,
      weaponType,
      caliber,
      price,
      imageUrl,
    });

    res.status(200).json({ message: "Weapon created successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.updateWeapon = async (req, res, next) => {
  const weaponId = req.params.weaponId;
  const { name, description, weaponType, caliber, price, imageUrl } = req.body;

  try {
    const weapon = await Weapon.findByPk(weaponId);

    if (!weapon) {
      const error = new Error("No weapon with given id was found!");
      error.statusCode = 404;
      throw error;
    }

    if (weapon.userId !== req.userId) {
      const error = new Error("You are not allowed to edit this weapon!");
      error.statusCode = 403;
      throw error;
    }

    weapon.name = name;
    weapon.description = description;
    weapon.weaponType = weaponType;
    weapon.caliber = caliber;
    weapon.price = price;
    weapon.imageUrl = imageUrl;

    await weapon.save();

    res.status(200).json({ message: "Weapon successfully updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.deleteWeapon = async (req, res, next) => {
  const weaponId = req.params.weaponId;

  try {
    const weapon = await Weapon.findByPk(weaponId);

    if (!weapon) {
      const error = new Error("No weapon with given id was found!");
      error.statusCode = 404;
      throw error;
    }

    if (weapon.userId !== req.userId) {
      const error = new Error("You are not allowed to delete this weapon!");
      error.statusCode = 403;
      throw error;
    }

    await weapon.destroy();

    res.status(200).json({ message: "Weapon successfully deleted!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.createAmmo = (req, res, next) => {
  const { name, ammoType, quantity, caliber, price, imageUrl } = req.body;

  try {
    req.user.createAmmo({
      name,
      ammoType,
      quantity,
      caliber,
      price,
      imageUrl,
    });

    res.status(200).json({ message: "Ammo created successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.updateAmmo = async (req, res, next) => {
  const ammoId = req.params.ammoId;
  const { name, ammoType, quantity, caliber, price, imageUrl } = req.body;

  try {
    const ammo = await Ammo.findByPk(ammoId);

    if (!ammo) {
      const error = new Error("No ammo with given id was found!");
      error.statusCode = 404;
      throw error;
    }

    if (ammo.userId !== req.userId) {
      const error = new Error("You are not allowed to edit this ammo!");
      error.statusCode = 403;
      throw error;
    }

    ammo.name = name;
    ammo.ammoType = ammoType;
    ammo.quantity = quantity;
    ammo.caliber = caliber;
    ammo.price = price;
    ammo.imageUrl = imageUrl;

    await ammo.save();

    res.status(200).json({ message: "Ammo successfully updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.deleteAmmo = async (req, res, next) => {
  const ammoId = req.params.ammoId;

  try {
    const ammo = await Ammo.findByPk(ammoId);

    if (!ammo) {
      const error = new Error("No ammo with given id was found!");
      error.statusCode = 404;
      throw error;
    }

    if (ammo.userId !== req.userId) {
      const error = new Error("You are not allowed to delete this ammo!");
      error.statusCode = 403;
      throw error;
    }

    await ammo.destroy();

    res.status(200).json({ message: "Ammo successfully deleted!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.order = (req, res, next) => {};
