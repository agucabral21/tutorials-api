const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const UserModel = require('../models/User');
const config = require('../config/db');

const sequelize = new Sequelize(config);

const User = UserModel(sequelize, DataTypes);

// eslint-disable-next-line no-return-await
(async () => await sequelize.sync({ alter: true }))();

module.exports = {
  sequelize,
  User,
};
