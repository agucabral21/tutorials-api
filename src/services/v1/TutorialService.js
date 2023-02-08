const { Tutorial } = require('../database');

async function add(data) {
  const tutorial = await Tutorial.create(data);
  return tutorial;
}

module.exports = { add };
