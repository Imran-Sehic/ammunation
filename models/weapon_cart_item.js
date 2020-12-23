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
    weaponCartId: {
      type: DataTypes.INTEGER,
      references: {
        model: "weapon_carts",
        key: "id",
      },
    },
    weaponId: {
      type: DataTypes.INTEGER,
      references: {
        model: "weapons",
        key: "id",
      },
    }
  });
  return WeaponCartItem;
};
