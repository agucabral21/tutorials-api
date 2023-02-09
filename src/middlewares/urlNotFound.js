const { errorResponse } = require('../helpers/responses');

const urlNotFoundHandler = (req, res) => {
  res.status(404).json(errorResponse(`Can't find ${req.originalUrl} on this server!`));
};

module.exports = urlNotFoundHandler;
