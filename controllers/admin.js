const sequelize = require("../util/db");
const { DataTypes } = require("sequelize");
const Weapon = require("../models/weapon")(sequelize, DataTypes);
const User = require("../models/user")(sequelize, DataTypes);

exports.getProfile = async (req, res, next) => {};

exports.addWeapon = async (req, res, next) => {};

exports.updateWeapon = (req, res, next) => {};

exports.deleteWeapon = (req, res, next) => {};

exports.addAmmo = (req, res, next) => {};

exports.updateAmmo = (req, res, next) => {};

exports.deleteAmmo = (req, res, next) => {};

exports.order = (req, res, next) => {};
