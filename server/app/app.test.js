const app = require('./app');
const request = require('supertest');
const db = require('../data/db');

describe('Endpoints', () => {
  beforeAll(() => {
    db.migrate.latest().then(() => {
      db.seed.run();
    });
  });

  it('should respond with a 200 and some html', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('<!doctype html>');
  });

  it('should respond with a 200', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('OK');
  });

  it('should respond with a 404', async () => {
    const response = await request(app).get('/doesNotExist');
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Not Found');
  });
});
