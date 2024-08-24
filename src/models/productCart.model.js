const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const ProductCart = db.define('productCart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'pause'),
    allowNull: false,
    defaultValue: 'active',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ProductCart;
