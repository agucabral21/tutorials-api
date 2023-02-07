const jwt = require('jsonwebtoken');

const generateJWT = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.PRIVATE_API_KEY, (err, token) => {
      if (err) {
        console.log(err);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Error generating web token');
      } else {
        resolve(token);
      }
    });
  });

module.exports = { generateJWT };
