const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");

const Weapon = sequelize.define("weapon", {
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
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weaponType: {
    type: DataTypes.STRING,
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
  weapon_img: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue("weapon_img").split(";");
    },
    set(val) {
      this.setDataValue("weapon_img", val.join(";"));
    },
  },
});

module.exports = Weapon;
