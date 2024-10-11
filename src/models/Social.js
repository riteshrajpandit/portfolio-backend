// src/models/Social.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Social = sequelize.define('Social', {
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Social;
};