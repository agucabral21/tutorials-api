const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const { UserModel, TutorialModel, RoleModel } = require('../models');

const config = require('../config/db');

const sequelize = new Sequelize(config);

const User = UserModel(sequelize, DataTypes);
const Tutorial = TutorialModel(sequelize, DataTypes);
const Role = RoleModel(sequelize, DataTypes);

User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' });

module.exports = {
  sequelize,
  User,
  Tutorial,
  Role,
};
