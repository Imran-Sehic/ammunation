const { expect } = require("chai");

const {
  checkModelName,
  checkPropertyExists,
  sequelize,
  dataTypes,
} = require("sequelize-test-helpers");

const AmmoCartItem = require("../../models/ammo_cart_item")(sequelize, dataTypes);

describe("ammo-cart-item model test", () => {
  const ammoCartItem = new AmmoCartItem();

  checkModelName(AmmoCartItem)("ammo_cart_item");

  context("properties", () => {
    [
      "id",
      "quantity",
      "ammoCartId",
      "ammoId"
    ].forEach(checkPropertyExists(ammoCartItem));
  });
});
