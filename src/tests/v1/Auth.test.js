const request = require('supertest');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const app = require('../../config/app');

const { User, sequelize } = require('../../services/database');

dotenv.config();

beforeAll(async () => {
  await sequelize.sync();
});

afterEach(async () => {
  await User.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Test POST /api/v1/auth endpoint.', () => {
  test('Should return a jwt token for existing user', async () => {
    const userData = {
      firstName: 'Agu',
      lastName: 'Cabral',
      email: 'agucabral@gmail.com',
      password: 'pass',
    };
    const user = await User.create(userData);
    const data = {
      email: user.email,
      password: user.password,
    };

    const response = await request(app).post('/api/v1/auth').send(data);

    expect(response.statusCode).toBe(200);
    const { token } = response.body.data;
    const decodedToken = jwt.verify(token, process.env.PRIVATE_API_KEY);
    expect(decodedToken.user.id).toBe(user.id);
  });

  test('Should return  401 for no existing user', async () => {
    const userData = {
      firstName: 'Agu',
      lastName: 'Cabral',
      email: 'agucabral@gmail.com',
      password: 'pass',
    };
    const user = await User.create(userData);
    const data = {
      email: 'agucabral@gmail.com1',
      password: user.password,
    };

    const response = await request(app).post('/api/v1/auth').send(data);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('User does not exist.');
  });

  test('Should return  401 for incorrect password', async () => {
    const userData = {
      firstName: 'Agu',
      lastName: 'Cabral',
      email: 'agucabral@gmail.com',
      password: 'pass',
    };
    const user = await User.create(userData);
    const data = {
      email: user.email,
      password: 'wrongPass',
    };

    const response = await request(app).post('/api/v1/auth').send(data);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Incorrect Password.');
  });
});
