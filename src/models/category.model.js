const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Category = db.define('category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
