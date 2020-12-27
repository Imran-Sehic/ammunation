const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");

const Ammo = sequelize.define("ammo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ammoType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  caliber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue("imageUrl").split(";");
    },
    set(val) {
      this.setDataValue("imageUrl", val.join(";"));
    },
  },
});

module.exports = Ammo;
