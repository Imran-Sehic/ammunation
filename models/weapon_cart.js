const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");
const User = require("./user");

module.exports = (sequelize, DataTypes) => {
  const WeaponCart = sequelize.define("weapon_cart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  });
  return WeaponCart;
};
