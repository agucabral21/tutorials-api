const request = require('supertest');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = require('../../config/app');

const { Tutorial, sequelize } = require('../../services/database');
const { generateJWT } = require('../../helpers/jwt-generator');

dotenv.config();

afterEach(async () => {
  await Tutorial.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });
});

afterAll(async () => {
  await Tutorial.destroy({
    truncate: { cascade: true, restartIdentity: true },
  });
  await sequelize.close();
});

describe('Test GET /api/v1/tutorials/token endpoint.', () => {
  test('Should return a jwt token with expiration', async () => {
    const payload = { user: { id: 1 } };
    const token = await generateJWT(payload);
    request(app)
      .get('/api/v1/tutorials/token')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const videoToken = response.body.data.token;
        const decodedToken = jwt.verify(videoToken, process.env.PRIVATE_API_KEY);
        expect(decodedToken.user.id).toBe(payload.user.id);
        expect(decodedToken.exp).toBeTruthy();
      });
  });

  test('Should return 401 for not valid token', async () => {
    const token = 'this is not a token';
    request(app)
      .get('/api/v1/tutorials/token')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .then(async (response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Not valid token');
      });
  });

  test('Should return 401 for lack of Authorization header', async () => {
    request(app)
      .get('/api/v1/tutorials/token')
      .set('Accept', 'application/json')

      .then(async (response) => {
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Authorization Token Required');
      });
  });
});
