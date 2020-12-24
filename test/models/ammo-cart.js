const { expect } = require("chai");

const {
  checkModelName,
  checkPropertyExists,
  sequelize,
  dataTypes,
} = require("sequelize-test-helpers");

const AmmoCart = require("../../models/ammo_cart")(sequelize, dataTypes);

describe("ammo-cart model test", () => {
  const ammoCart = new AmmoCart();

  checkModelName(AmmoCart)("ammo_cart");

  context("properties", () => {
    [
      "id",
      "userId"
    ].forEach(checkPropertyExists(ammoCart));
  });
});
