const { Op } = require('sequelize');
const { Tutorial } = require('../database');

async function add(data) {
  const tutorial = await Tutorial.create(data);
  return tutorial;
}

async function findAll(filters, sort = false) {
  const { title, description } = filters;
  const parsedFilters = {};
  if (title) parsedFilters.title = { [Op.like]: `%${title}%` };
  if (description) parsedFilters.description = { [Op.like]: `%${description}%` };
  const query = {
    where: { ...parsedFilters },
  };
  console.log(query);
  if (sort) {
    query.order = [['id', sort]];
  }
  const tutorial = await Tutorial.findAll(query);
  return tutorial;
}

module.exports = { add, findAll };
