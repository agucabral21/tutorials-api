const { generateJWT } = require('../helpers/jwt-generator');
const { User } = require('../services/database');
const { errorResponse } = require('../helpers/responses');

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).send(errorResponse('User does not exist.'));
  }
  if (user.password !== password) {
    return res.status(401).send(errorResponse('Incorrect Password.'));
  }

  const jwt = await generateJWT({ user: user.id });

  return res.status(200).send({ jwt });
}

module.exports = { login };
