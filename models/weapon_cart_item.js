module.exports = (sequelize, DataTypes) => {
  const WeaponCartItem = sequelize.define("weapon_cart_item", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  });
  return WeaponCartItem;
};
