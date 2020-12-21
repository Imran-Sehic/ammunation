const { expect } = require("chai");

const {
  checkModelName,
  checkPropertyExists,
  sequelize,
  dataTypes,
} = require("sequelize-test-helpers");

const WeaponCartItem = require("../../models/weapon-cart-item")(sequelize, dataTypes);

describe("weapon-cart-item model test", () => {
  const weaponCartItem = new WeaponCartItem();

  checkModelName(WeaponCartItem)("weapon-cart-item");

  context("properties", () => {
    [
      "id",
      "quantity"
    ].forEach(checkPropertyExists(weaponCartItem));
  });
});
