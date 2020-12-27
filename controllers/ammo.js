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

exports.buyAmmo = async (req, res, next) => {
  const ammoId = req.params.ammoId;
  let newQuantity = 1;
  let ammo;

  try {
    const ammoCart = await req.user.getAmmo_cart();
    const cartAmmos = await ammoCart.getAmmos({
      where: { id: ammoId },
    });

    if (cartAmmos.length > 0) {
      ammo = cartAmmos[0];
      newQuantity = ammo.ammo_cart_item.quantity + 1;
    } else {
      ammo = await Ammo.findByPk(ammoId);
    }

    await ammoCart.addAmmo(ammo, {
      through: { quantity: newQuantity },
    });

    res.status(200).json({message: "Ammo bought!"});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removeAmmoFromCart = async (req, res, next) => {
  const ammoId = req.params.ammoId;

  try {
    const ammoCart = await req.user.getAmmo_cart();
    const cartAmmo = await ammoCart.getAmmos({ where: { id: ammoId } });

    if(cartAmmo.length <= 0) {
      const error = new Error("No ammo with given id was found!");
      error.statusCode = 404;
      throw error;
    }

    await ammoCart.removeAmmo(cartAmmo);

    res.status(200).json({ message: "Ammo successfully removed!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
