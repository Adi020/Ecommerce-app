const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const ProductHistory = db.define("productHistory");

module.exports = ProductHistory;
