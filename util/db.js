const {Sequelize} = require("sequelize");

const db = new Sequelize("ammunation", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;