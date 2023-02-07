const dotenv = require('dotenv');

dotenv.config();
const { User, sequelize } = require('../services/database');

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  await User.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Test for createPost Service.', () => {
  test('addUser -> should addUser and validate password', async () => {
    const userData = {
      firstName: 'Agu',
      lastName: 'Cabral',
      email: 'agucabrl.com',
      password: 'pasasdsads',
    };

    const user = await User.create(userData);
    const validatePassword = user.validPassword(userData.password);
    expect(validatePassword).toBeTruthy();
  });

  test('addUser -> should addUser and not validate wrong password', async () => {
    const userData = {
      firstName: 'Agu',
      lastName: 'Cabral',
      email: 'agucabrl.com',
      password: 'pasasdsads',
    };

    const user = await User.create(userData);

    const validatePassword = user.validPassword('wrong_pass');

    expect(validatePassword).toBe(false);
  });
});
