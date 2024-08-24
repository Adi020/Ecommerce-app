const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Rating = db.define('rating', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Rating;
