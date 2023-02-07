const errorResponse = (message, data) => ({
  error: true,
  message,
  data,
});

const okResponse = (data, message) => ({
  error: false,
  data,
  message,
});

module.exports = { okResponse, errorResponse };
