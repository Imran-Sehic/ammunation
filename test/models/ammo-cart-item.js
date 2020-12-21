const { expect } = require("chai");

const {
  checkModelName,
  checkPropertyExists,
  sequelize,
  dataTypes,
} = require("sequelize-test-helpers");

const AmmoCartItem = require("../../models/ammo-cart-item")(sequelize, dataTypes);

describe("ammo-cart-item model test", () => {
  const ammoCartItem = new AmmoCartItem();

  checkModelName(AmmoCartItem)("ammo-cart-item");

  context("properties", () => {
    [
      "id",
      "quantity"
    ].forEach(checkPropertyExists(ammoCartItem));
  });
});
