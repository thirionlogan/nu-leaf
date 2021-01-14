const app = require('./app');
const request = require('supertest');
const db = require('../data/db');

describe('Endpoints', () => {
  beforeAll(async () => {
    await db.migrate.latest().then(() => {
      db.seed.run();
    });
  });

  it('should respond with a 200 and some html', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('<!doctype html>');
  });

  it('should respond with a 404', async () => {
    const response = await request(app).get('/doesNotExist');
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Not Found');
  });

  describe('POST /api/register', () => {
    const newUser = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@email.com',
      password: 'password',
      confirmPassword: 'password',
    };

    it('should respond with a 422 when a firstName is missing', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({ ...newUser, firstName: undefined });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });
    it('should respond with a 422 when a lastName is missing', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({ ...newUser, lastName: undefined });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });
    it('should respond with a 422 when a email is missing', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({ ...newUser, email: undefined });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });
    it('should respond with a 422 when a password is missing', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({ ...newUser, password: undefined });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });
    it('should respond with a 422 when confirmPassword is missing', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({ ...newUser, confirmPassword: undefined });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });

    it('should respond with a 422 if confirmPassword does not match password', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({ ...newUser, confirmPassword: 'notpassword' });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });

    it('should respond with a 201 and register the user', async () => {
      const response = await request(app).post('/api/register').send(newUser);
      expect(response.statusCode).toBe(201);
      expect(response.text).toContain('Created');
    });

    it('should respond with a 422 if user already exists', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({ ...newUser, email: 'johndoe@email.com' });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });
  });

  describe('POST /api/login', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
    };

    it('should log in', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ email: user.email, password: 'password' });
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(user);
    });

    it('should not log in with wrong password', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ email: user.email, password: 'wrong password' });
      expect(response.statusCode).toBe(401);
      expect(response.text).toBe('Unauthorized');
    });
  });

  describe('POST /api/logout', () => {
    it('should respond with 200 and log out', async () => {
      const response = await request(app).post('/api/logout');
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('OK');
    });
  });
});
