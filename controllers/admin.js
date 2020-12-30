const Weapon = require("../models/weapon");
const Ammo = require("../models/ammo");
const { validationResult } = require("express-validator");
const fileHelper = require("../util/deleteFile");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

exports.getProfile = async (req, res, next) => {
  try {
    const userWeapons = await req.user.getWeapons();
    const userAmmos = await req.user.getAmmos();

    res
      .status(200)
      .json({ user: req.user, weapons: userWeapons, ammos: userAmmos });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

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
  const { name, description, weaponType, caliber, price } = req.body;
  const weapon_img = req.files;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  if (!weapon_img) {
    const error = new Error("No weapon image is selected");
    error.statusCode = 422;
    return next(error);
  }

  if(weapon_img.length > 3) {
    const error = new Error("No more than 3 images can be selected!");
    error.statusCode = 422;
    return next(error);
  }

  try {
    req.user.createWeapon({
      name,
      description,
      weaponType,
      caliber,
      price,
      weapon_img: weapon_img,
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
  const { name, description, weaponType, caliber, price } = req.body;
  const weapon_img = req.files;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

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

    if(weapon_img.length > 3) {
      const error = new Error("No more than 3 images can be selected!");
      error.statusCode = 422;
      throw error;
    }

    if (weapon_img) {
      weapon.weapon_img.forEach((image) => {
        fileHelper.deleteFile(image);
      });
      weapon.weapon_img = weapon_img;
    }

    weapon.name = name;
    weapon.description = description;
    weapon.weaponType = weaponType;
    weapon.caliber = caliber;
    weapon.price = price;

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
    const weapons = await req.user.getWeapons({ where: { id: weaponId } });

    if (weapons.length <= 0) {
      const error = new Error("No weapon found!");
      error.statusCode = 404;
      throw error;
    }

    weapons[0].weapon_img.forEach((image) => {
      fileHelper.deleteFile(image);
    });

    await Weapon.destroy({ where: { id: weaponId } });

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
  const ammo_img = req.files;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  if (!ammo_img) {
    const error = new Error("No ammo image is selected!");
    error.statusCode = 422;
    return next(error);
  }

  if(ammo_img.length > 3) {
    const error = new Error("No more than 3 images can be selected!");
    error.statusCode = 422;
    return next(error);
  }

  try {
    req.user.createAmmo({
      name,
      ammoType,
      quantity,
      caliber,
      price,
      ammo_img: ammo_img,
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
  const { name, ammoType, quantity, caliber, price } = req.body;
  const ammo_img = req.files;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

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

    if(ammo_img.length > 3) {
      const error = new Error("No more than 3 images can be selected!");
      error.statusCode = 422;
      throw error;
    }

    if(ammo_img) {
      ammo.ammo_img.forEach((image) => {
        fileHelper.deleteFile(image);
      });
      ammo.ammo_img = ammo_img;
    }

    ammo.name = name;
    ammo.ammoType = ammoType;
    ammo.quantity = quantity;
    ammo.caliber = caliber;
    ammo.price = price;

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
    const ammos = await req.user.getAmmos({ where: { id: ammoId } });

    if (ammos.length <= 0) {
      const error = new Error("No ammo found!");
      error.statusCode = 404;
      throw error;
    }

    ammos[0].ammo_img.forEach((image) => {
      fileHelper.deleteFile(image);
    });

    await Ammo.destroy({ where: { id: ammoId } });

    res.status(200).json({ message: "Ammo successfully deleted!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.order = async (req, res, next) => {
  let totalWeaponPrice = 0;
  let totalWeapons = 0;

  let totalAmmoPrice = 0;
  let totalAmmos = 0;

  try {
    const weaponCart = await req.user.getWeapon_cart();
    const cartWeapons = await weaponCart.getWeapons();
    const ammoCart = await req.user.getAmmo_cart();
    const cartAmmos = await ammoCart.getAmmos();

    cartWeapons.forEach((weapon) => {
      totalWeaponPrice += weapon.price * weapon.weapon_cart_item.quantity;
      totalWeapons += weapon.weapon_cart_item.quantity;
    });

    cartAmmos.forEach((ammo) => {
      totalAmmoPrice += ammo.price * ammo.ammo_cart_item.quantity;
      totalAmmos += ammo.ammo_cart_item.quantity;
    });

    const session = stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        ...cartWeapons.map((weapon) => {
          return {
            name: weapon.name,
            description: weapon.description,
            amount: weapon.price * 100,
            currency: "usd",
            quantity: weapon.weapon_cart_item.quantity,
          };
        }),
        ...ammoWeapons.map((ammo) => {
          return {
            name: ammo.name,
            description: ammo.ammoType + ", " + ammo.caliber,
            amount: ammo.price * 100,
            currency: "usd",
            quantity: ammo.ammo_cart_item.quantity,
          };
        }),
      ],
      success_url: req.protocol + "://" + req.get("host") + "/checkout/success",
      cancel_url: req.protocol + "://" + req.get("host") + "/checkout/cancel",
    });

    res.status(200).json({
      totalWeaponPrice: totalWeaponPrice,
      totalWeapons: totalWeapons,
      totalAmmoPrice: totalAmmoPrice,
      totalAmmos: totalAmmos,
      weapons: cartWeapons,
      ammos: cartAmmos,
      sessionId: session.id,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.checkoutSuccess = async (req, res, next) => {
  try {
    const weaponCart = await req.user.getWeapon_cart();
    const cartWeapons = await weaponCart.getWeapons();

    const ammoCart = await req.user.getAmmo_cart();
    const cartAmmos = await ammoCart.getAmmos();

    await weaponCart.removeWeapon(cartWeapons);
    await ammoCart.removeAmmo(cartAmmos);

    res.status(200).json({ message: "Checkout succeded!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.checkoutCancel = (req, res, next) => {
  try {
    res.status(500).json({ message: "Checkout canceled!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};
