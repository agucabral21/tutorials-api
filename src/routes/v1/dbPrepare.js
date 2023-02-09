const router = require('express').Router();
const { User, Role } = require('../../services/database');

router.get('/', async (req, res) => {
  const adminRole = await Role.create({ name: 'admin' });
  const userRole = await Role.create({ name: 'user' });

  const userData = {
    firstName: 'Agustin',
    lastName: 'Cabral',
    email: 'agucabral@gmail.com',
    password: 'myDifficultPa55w0rD',
  };
  const userData2 = {
    firstName: 'Michael',
    lastName: 'Scott',
    email: 'mgscott@gmail.com',
    password: 'michaelscorn',
  };

  const user = await User.create(userData);
  const user2 = await User.create(userData2);

  user.addRole(adminRole);
  user2.addRole(userRole);
  return res.status(200).send();
});

module.exports = router;
