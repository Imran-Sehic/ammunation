const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");

const WeaponCart = sequelize.define("weapon_cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = WeaponCart;
