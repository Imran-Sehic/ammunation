const { expect } = require("chai");

const {
  checkModelName,
  checkPropertyExists,
  sequelize,
  dataTypes,
} = require("sequelize-test-helpers");

const WeaponCart = require("../../models/weapon-cart")(sequelize, dataTypes);

describe("weapon-cart model test", () => {
  const weaponCart = new WeaponCart();

  checkModelName(WeaponCart)("weapon-cart");

  context("properties", () => {
    [
      "id",
    ].forEach(checkPropertyExists(weaponCart));
  });
});
