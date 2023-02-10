const { User } = require('../database');

async function findById(id) {
  const user = await User.findOne({ where: { id } });
  return user;
}

module.exports = { findById };
