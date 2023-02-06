const Sequelize = require('sequelize');
const config = require('../config/db');

const sequelize = new Sequelize(config);

// eslint-disable-next-line no-return-await
(async () => await sequelize.sync({ alter: true }))();

module.exports = {
  sequelize,
};
