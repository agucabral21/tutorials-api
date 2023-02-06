const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const { UserModel } = require('../models');

const config = require('../config/db');

const sequelize = new Sequelize(config);

const User = UserModel(sequelize, DataTypes);

module.exports = {
  sequelize,
  User,
};
