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
    ammoCartId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ammo_carts",
        key: "id",
      },
    },
    ammoId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ammos",
        key: "id",
      },
    }
  });
  return AmmoCartItem;
};
