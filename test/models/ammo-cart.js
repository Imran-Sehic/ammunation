const { expect } = require("chai");

const {
  checkModelName,
  checkPropertyExists,
  sequelize,
  dataTypes,
} = require("sequelize-test-helpers");

const AmmoCart = require("../../models/ammo-cart")(sequelize, dataTypes);

describe("ammo-cart model test", () => {
  const ammoCart = new AmmoCart();

  checkModelName(AmmoCart)("ammo-cart");

  context("properties", () => {
    [
      "id",
    ].forEach(checkPropertyExists(ammoCart));
  });
});
