const { okResponse } = require('../../helpers/responses');
const { generateJWT } = require('../../helpers/jwt-generator');

async function getToken(req, res) {
  const jwt = await generateJWT({ id: req.id }, { expiresIn: '5m' });
  return res.status(200).send(okResponse({ jwt }));
}

module.exports = { getToken };
