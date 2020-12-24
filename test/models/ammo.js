const { expect } = require("chai");

const {
  checkModelName,
  checkPropertyExists,
  sequelize,
  dataTypes,
} = require("sequelize-test-helpers");

const Ammo = require("../../models/ammo")(sequelize, dataTypes);

describe("ammo model test", () => {
  const ammo = new Ammo();

  checkModelName(Ammo)("ammo");

  context("properties", () => {
    [
      "id",
      "name",
      "ammoType",
      "quantity",
      "caliber",
      "price",
      "imageUrl",
      "userId"
    ].forEach(checkPropertyExists(ammo));
  });
});
