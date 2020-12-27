const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");

const AmmoCart = sequelize.define("ammo_cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = AmmoCart;
