const jwt = require('jsonwebtoken');
const { errorResponse } = require('../helpers/responses');

// eslint-disable-next-line consistent-return
const jwtValidation = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    const secret = process.env.PRIVATE_API_KEY;
    token = token.replace('Bearer ', '');
    try {
      const decodedToken = jwt.verify(token, secret);
      req.tokenPayload = decodedToken;
      next();
    } catch (e) {
      return res.status(401).json(errorResponse('Not valid token'));
    }
  } else {
    return res.status(401).json(errorResponse('Authorization Token Required'));
  }
};

module.exports = jwtValidation;
