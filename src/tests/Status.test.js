const request = require('supertest');
const dotenv = require('dotenv');
const app = require('../config/app');

dotenv.config();

describe('Test status endpoint.', () => {
  test('It should show service status.', (done) => {
    request(app)
      .get('/status')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });
});
