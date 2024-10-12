

// src/models/Blog.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Blog = sequelize.define('Blog', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publishDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return Blog;
};





