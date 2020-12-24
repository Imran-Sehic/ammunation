const { expect } = require("chai");

const {
  checkModelName,
  checkPropertyExists,
  sequelize,
  dataTypes,
} = require("sequelize-test-helpers");

const Weapon = require("../../models/weapon")(sequelize, dataTypes);

describe("weapon model test", () => {
  const weapon = new Weapon();

  checkModelName(Weapon)("weapon");

  context("properties", () => {
    [
      "id",
      "name",
      "description",
      "weaponType",
      "caliber",
      "price",
      "imageUrl",
      "userId"
    ].forEach(checkPropertyExists(weapon));
  });
});
