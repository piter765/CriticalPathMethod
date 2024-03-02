const { Sequelize } = require("sequelize");

const createDB = new Sequelize("test-db","user","pass", {
    dialect: "sqlite",
    host: "./config/db.sqlite",
});

module.exports = createDB;