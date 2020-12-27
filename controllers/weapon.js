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

exports.getSingleWeapon = async (req, res, next) => {
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
};

exports.buyWeapon = async (req, res, next) => {
  const weaponId = req.params.weaponId;
  let newQuantity = 1;
  let weapon;

  try {
    const weaponCart = await req.user.getWeapon_cart();
    const cartWeapons = await weaponCart.getWeapons({
      where: { id: weaponId },
    });

    if (cartWeapons.length > 0) {
      weapon = cartWeapons[0];
      newQuantity = weapon.weapon_cart_item.quantity + 1;
    } else {
      weapon = await Weapon.findByPk(weaponId);
    }

    await weaponCart.addWeapon(weapon, {
      through: { quantity: newQuantity },
    });

    res.status(200).json({ message: "Weapon bought!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removeWeaponFromCart = async (req, res, next) => {
  const weaponId = req.params.weaponId;

  try {
    const weaponCart = await req.user.getWeapon_cart();
    const cartWeapon = await weaponCart.getWeapons({ where: { id: weaponId } });

    if(cartWeapon.length <= 0) {
      const error = new Error("No weapon with given id was found!");
      error.statusCode = 404;
      throw error;
    }

    await weaponCart.removeWeapon(cartWeapon);

    res.status(200).json({ message: "Weapon successfully removed!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
