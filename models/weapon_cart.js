module.exports = (sequelize, DataTypes) => {
const WeaponCart = sequelize.define("weapon_cart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  });
  return WeaponCart;
};
