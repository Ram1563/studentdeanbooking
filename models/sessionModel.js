const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database.url, {
  dialect: 'postgres',
});

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  deanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  dayOfWeek: {
    type: DataTypes.STRING, // Use STRING instead of ENUM
    allowNull: false,
    validate: {
      isIn: [['Thursday', 'Friday']], // Validate allowed values
    },
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // You can set the default value as per your requirements
  },
  // Add more session properties as needed
});

sequelize.sync();

module.exports = Session;
