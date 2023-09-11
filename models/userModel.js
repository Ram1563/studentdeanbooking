const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database.url, {
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  universityId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING, // Use a string type for the role
    allowNull: false,
    validate: {
      isIn: [['student', 'dean']], // Define the allowed roles
    },
  },
});

sequelize.sync();

module.exports = User;
