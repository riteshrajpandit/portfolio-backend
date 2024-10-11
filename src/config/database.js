const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

// Import models
const User = require('../models/User')(sequelize);
const Blog = require('../models/Blog')(sequelize);
const Project = require('../models/Project')(sequelize);
const Message = require('../models/Message')(sequelize);
const Social = require('../models/Social')(sequelize);

// Initialize models
const models = {
  User,
  Blog,
  Project,
  Message,
  Social
};

async function initializeDatabase() {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log('Connected to the database.');

    // Create tables
    await sequelize.sync({ force: true }); // Be careful with {force: true} in production!
    console.log('Database synchronized.');

    // Create admin user
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      username: 'admin',
      password: hashedPassword,
      isAdmin: true
    });
    console.log('Admin user created.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, initializeDatabase, models };