const configurations = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'tutorials_dev',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'tutorials_test',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
};

module.exports = configurations[process.env.NODE_ENV];
