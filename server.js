require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const sequelize = require("./util/db");
const User = require("./models/user");
const Weapon = require("./models/weapon");
const WeaponCart = require("./models/weapon_cart");
const WeaponCartItem = require("./models/weapon_cart_item");
const Ammo = require("./models/ammo");
const AmmoCart = require("./models/ammo_cart");
const AmmoCartItem = require("./models/ammo_cart_item");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(routes);

Weapon.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Ammo.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Weapon);
User.hasMany(Ammo);
User.hasOne(WeaponCart);
User.hasOne(AmmoCart);
WeaponCart.belongsTo(User);
AmmoCart.belongsTo(User);
WeaponCart.belongsToMany(Weapon, { through: WeaponCartItem });
AmmoCart.belongsToMany(Ammo, { through: AmmoCartItem });
Weapon.belongsToMany(WeaponCart, { through: WeaponCartItem });
Ammo.belongsToMany(AmmoCart, { through: AmmoCartItem });

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
