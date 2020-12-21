const { expect } = require("chai");

const {
  checkModelName,
  checkPropertyExists,
  sequelize,
  dataTypes,
} = require("sequelize-test-helpers");

const User = require("../../models/user").model();

describe("user model test", () => {
  const user = new User();

  checkModelName(User)("user");

  context("properties", () => {
    [
      "id",
      "firstname",
      "lastname",
      "age",
      "password",
      "email",
      "imageUrl",
      "verified",
    ].forEach(checkPropertyExists(user));
  });
});
