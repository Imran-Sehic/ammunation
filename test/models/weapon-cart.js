const { expect } = require("chai");

const {
  checkModelName,
  checkPropertyExists,
  sequelize,
  dataTypes,
} = require("sequelize-test-helpers");

const WeaponCart = require("../../models/weapon_cart")(sequelize, dataTypes);

describe("weapon-cart model test", () => {
  const weaponCart = new WeaponCart();

  checkModelName(WeaponCart)("weapon_cart");

  context("properties", () => {
    [
      "id",
      "userId"
    ].forEach(checkPropertyExists(weaponCart));
  });
});
