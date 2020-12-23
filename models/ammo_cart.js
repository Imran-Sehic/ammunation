module.exports = (sequelize, DataTypes) => {
  const AmmoCart = sequelize.define("ammo_cart", {
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
    }
  });
  return AmmoCart;
};
