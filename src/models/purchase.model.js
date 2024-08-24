const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Purchase = db.define('purchase', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 1.0,
    },
  },
});

module.exports = Purchase;
