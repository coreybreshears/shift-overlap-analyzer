require("dotenv").config();
const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
});

module.exports = db;
