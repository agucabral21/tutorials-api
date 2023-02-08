const request = require('supertest');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = require('../../config/app');

const { Tutorial, sequelize } = require('../../services/database');
const { generateToken, generateTutorialToken } = require('../../helpers/jwt-generator');

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
    const token = await generateToken(payload);

    const response = await request(app)
      .get('/api/v1/tutorials/token')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => res);

    expect(response.statusCode).toBe(200);
    const videoToken = response.body.data.token;
    const decodedToken = jwt.verify(videoToken, process.env.PRIVATE_API_KEY_TUTORIALS);
    expect(decodedToken.user.id).toBe(payload.user.id);
    expect(decodedToken.exp).toBeTruthy();
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

describe('Test POST /api/v1/tutorials', () => {
  test('Should add a tutorial correctly', async () => {
    const tutorialData = {
      title: 'Music Tutorial',
      videoURL: 'www.google.com',
      description: 'Music Video for Testing',
    };
    const payload = { user: { id: 1 } };
    const tutorialToken = await generateTutorialToken(payload);
    const response = await request(app)
      .post('/api/v1/tutorials')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tutorialToken}`)
      .send(tutorialData)
      .then((res) => res);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.tutorial.title).toBe(tutorialData.title);
  });

  test('Should return 400 error for invalid url', async () => {
    const tutorialData = {
      title: 'Music Tutorial',
      videoURL: 'thisisnotanurl',
      description: 'Music Video for Testing',
    };
    const payload = { user: { id: 1 } };
    const tutorialToken = await generateTutorialToken(payload);
    const response = await request(app)
      .post('/api/v1/tutorials')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tutorialToken}`)
      .send(tutorialData)
      .then((res) => res);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.errors[0].msg).toBe('Invalid value');
    expect(response.body.errors[0].param).toBe('videoURL');
  });

  test('Should return 400 error for non existing title', async () => {
    const tutorialData = {
      videoURL: 'thisisnotanurl',
      description: 'Music Video for Testing',
    };
    const payload = { user: { id: 1 } };
    const tutorialToken = await generateTutorialToken(payload);
    const response = await request(app)
      .post('/api/v1/tutorials')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tutorialToken}`)
      .send(tutorialData)
      .then((res) => res);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.errors[0].msg).toBe('Invalid value');
    expect(response.body.errors[0].param).toBe('title');
  });

  test('Should return 401 error for invalid token', async () => {
    const tutorialData = {
      videoURL: 'thisisnotanurl',
      description: 'Music Video for Testing',
    };
    const tutorialToken = 'not a token';
    const response = await request(app)
      .post('/api/v1/tutorials')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tutorialToken}`)
      .send(tutorialData)
      .then((res) => res);
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeTruthy();
  });
});

describe('Test GET /api/v1/tutorials', () => {
  test('Should find all filtered tutorials', async () => {
    await Tutorial.create({ title: 'A1', video_url: 'www.google.com/a1', description: 'A1 desc', published_status: 'PUBLISHED' });
    await Tutorial.create({ title: 'A2 test', video_url: 'www.google.com/a2', description: 'A2 one description', published_status: 'PUBLISHED' });
    await Tutorial.create({ title: 'B1 test', video_url: 'www.google.com/B1', description: 'B1 one description', published_status: 'PUBLISHED' });
    await Tutorial.create({ title: 'C1', video_url: 'www.google.com/a1', description: 'CA1 one description', published_status: 'PUBLISHED' });

    const payload = { user: { id: 1 } };
    const tutorialToken = await generateToken(payload);

    // get all
    let response = await request(app)
      .get('/api/v1/tutorials')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tutorialToken}`)
      .then((res) => res);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.size).toBe(4);
    expect(response.body.data.tutorials.length).toBe(4);

    // get all with title containing "test"
    response = await request(app)
      .get('/api/v1/tutorials')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tutorialToken}`)
      .query({ title: 'test' })
      .then((res) => res);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.size).toBe(2);
    expect(response.body.data.tutorials.length).toBe(2);

    // get all with title containing "test"
    response = await request(app)
      .get('/api/v1/tutorials')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tutorialToken}`)
      .query({ sort: 'desc', description: 'one' })
      .then((res) => res);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.size).toBe(3);
    expect(response.body.data.tutorials.length).toBe(3);
    expect(response.body.data.tutorials[0].title).toBe('C1');
  });

  test('Should return 400 for wrong order value', async () => {
    const payload = { user: { id: 1 } };
    const tutorialToken = await generateToken(payload);
    const response = await request(app)
      .get('/api/v1/tutorials')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tutorialToken}`)
      .query({ sort: 'wrong' })
      .then((res) => res);
    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].msg).toBe('Invalid value, allowed values are: asc|desc');
  });

  test('Should return 400 for wrong order value', async () => {
    const payload = { user: { id: 1 } };
    const tutorialToken = await generateToken(payload);
    const response = await request(app)
      .get('/api/v1/tutorials')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${tutorialToken}`)
      .query({ title: 'no tutorial with this' })
      .then((res) => res);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.size).toBe(0);
    expect(response.body.data.tutorials.length).toBe(0);
  });
});
