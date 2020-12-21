module.exports = (sequelize, DataTypes) => {
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
    userId: {
      type: DataTypes.INTEGER,
    },
  });
  return Weapon;
};
