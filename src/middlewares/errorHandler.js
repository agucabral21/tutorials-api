const { errorResponse } = require('../helpers/responses');

// Any error will be handled by this middleware
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { message } = err;
  const data = {};
  data.name = err.name;
  data.originalError = err;
  return res.status(500).send(errorResponse(message, data));
};

module.exports = errorHandler;
