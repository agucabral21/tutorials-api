const { okResponse } = require('../../helpers/responses');
const { generateJWT } = require('../../helpers/jwt-generator');

async function getToken(req, res) {
  console.log({ id: req.tokenPayload });

  const payload = { user: req.tokenPayload.user };
  const token = await generateJWT(payload, { expiresIn: '5m' });
  return res.status(200).send(okResponse({ token }));
}

module.exports = { getToken };
