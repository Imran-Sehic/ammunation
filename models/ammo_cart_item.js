module.exports = (sequelize, DataTypes) => {
  const AmmoCartItem = sequelize.define("ammo_cart_item", {
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
  return AmmoCartItem;
};
