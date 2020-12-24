const { expect } = require("chai");

const {
  checkModelName,
  checkPropertyExists,
  sequelize,
  dataTypes,
} = require("sequelize-test-helpers");

const WeaponCartItem = require("../../models/weapon_cart_item")(sequelize, dataTypes);

describe("weapon-cart-item model test", () => {
  const weaponCartItem = new WeaponCartItem();

  checkModelName(WeaponCartItem)("weapon_cart_item");

  context("properties", () => {
    [
      "id",
      "quantity",
      "weaponCartId",
      "weaponId"
    ].forEach(checkPropertyExists(weaponCartItem));
  });
});
