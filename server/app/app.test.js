const app = require('./app');
const request = require('supertest')(app);
const testSession = require('supertest-session')(app);
const db = require('../data/db');

describe('Endpoints', () => {
  beforeAll(async () => {
    await db.migrate.latest().then(() => {
      db.seed.run();
    });
  });

  it('should respond with a 200 and some html', async () => {
    const response = await request.get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('<!doctype html>');
  });

  it('should respond with a 404', async () => {
    const response = await request.get('/doesNotExist');
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
      const response = await request
        .post('/api/register')
        .send({ ...newUser, firstName: undefined });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });
    it('should respond with a 422 when a lastName is missing', async () => {
      const response = await request
        .post('/api/register')
        .send({ ...newUser, lastName: undefined });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });
    it('should respond with a 422 when a email is missing', async () => {
      const response = await request
        .post('/api/register')
        .send({ ...newUser, email: undefined });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });
    it('should respond with a 422 when a password is missing', async () => {
      const response = await request
        .post('/api/register')
        .send({ ...newUser, password: undefined });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });
    it('should respond with a 422 when confirmPassword is missing', async () => {
      const response = await request
        .post('/api/register')
        .send({ ...newUser, confirmPassword: undefined });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });

    it('should respond with a 422 if confirmPassword does not match password', async () => {
      const response = await request
        .post('/api/register')
        .send({ ...newUser, confirmPassword: 'notpassword' });
      expect(response.statusCode).toBe(422);
      expect(response.text).toContain('Unprocessable Entity');
    });

    it('should respond with a 201 and register the user', async () => {
      const response = await request.post('/api/register').send(newUser);
      expect(response.statusCode).toBe(201);
      expect(response.text).toContain('Created');
    });

    it('should respond with a 422 if user already exists', async () => {
      const response = await request
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
      const response = await request
        .post('/api/login')
        .send({ email: user.email, password: 'password' });
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(user);
    });

    it('should not log in with wrong password', async () => {
      const response = await request
        .post('/api/login')
        .send({ email: user.email, password: 'wrong password' });
      expect(response.statusCode).toBe(401);
      expect(response.text).toBe('Unauthorized');
    });
  });

  describe('POST /api/logout', () => {
    it('should respond with 200 and log out', async () => {
      const response = await request.post('/api/logout');
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('OK');
    });
  });

  describe('/api/resolution', () => {
    let authenticatedSession;
    beforeAll(async () => {
      await testSession
        .post('/api/login')
        .send({ email: 'johndoe@email.com', password: 'password' })
        .expect(200)
        .then((err) => {
          authenticatedSession = testSession;
        });
    });

    describe('POST /api/resolution', () => {
      const newResolution = {
        content: 'keep making more resolutions',
      };
      it('should respond with 201', async () => {
        const response = await authenticatedSession
          .post('/api/resolution')
          .send(newResolution);
        expect(response.statusCode).toBe(201);
        expect(response.text).toBe('Created');
      });

      it('should respond with 422', async () => {
        const response = await authenticatedSession
          .post('/api/resolution')
          .send({});
        expect(response.statusCode).toBe(422);
        expect(response.text).toBe('Unprocessable Entity');
      });
    });
    describe('GET /api/resolution', () => {
      const expectedResponse = expect.arrayContaining([
        expect.objectContaining({ user_id: 1, content: 'lose 15 lbs' }),
        expect.objectContaining({
          user_id: 1,
          content: 'actually fulfill resolutions this year',
        }),
        expect.objectContaining({
          user_id: 1,
          content: 'keep making more resolutions',
        }),
      ]);
      it('should respond with 200 and a list of resolutions', async () => {
        const response = await request.get('/api/resolution');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(expectedResponse);
      });
    });
    describe('GET /api/resolution/:id', () => {
      const expectedResponse = expect.objectContaining({
        user_id: 1,
        content: 'lose 15 lbs',
      });
      it('should respond with 200 and a list of resolutions', async () => {
        const response = await request.get('/api/resolution/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(expectedResponse);
      });
    });
    describe('PATCH /api/resolution/:id', () => {
      const updatedResolution = {
        content: 'update resolutions',
      };
      it('should respond with 204', async () => {
        let response = await authenticatedSession
          .patch('/api/resolution/1')
          .send(updatedResolution);
        expect(response.statusCode).toBe(204);

        response = await request.get('/api/resolution/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(
          expect.objectContaining({
            user_id: 1,
            content: 'update resolutions',
          })
        );
      });

      it('should respond with 422 if requrest is malformed', async () => {
        const response = await authenticatedSession.patch('/api/resolution/1');
        expect(response.statusCode).toBe(422);
      });
    });
    describe('DELETE /api/resolution/:id', () => {
      it('should respond with 200', async () => {
        let response = await authenticatedSession.delete('/api/resolution/1');
        expect(response.statusCode).toBe(200);

        response = await request.get('/api/resolution/1');
        expect(response.statusCode).toBe(404);
      });

      it('should respond with 404 when deleting a resolution that does not exist', async () => {
        let response = await authenticatedSession.delete('/api/resolution/100');
        expect(response.statusCode).toBe(404);
      });
    });
  });

  describe('Rate Limiter', () => {
    const mockedWarn = jest.fn();
    beforeEach(() => {
      console.warn = mockedWarn;
    });
    it('should trigger rate limiter', async () => {
      let allResponses = [];
      for (let index = 0; index < 5; index++) {
        allResponses.push(
          request
            .post('/api/login')
            .send({ email: 'attacker@hacker.com', password: 'bruteforce' })
        );
      }

      const promiseRace = Promise.race([
        Promise.all(allResponses),
        new Promise((resolve, reject) => {
          let id = setTimeout(() => {
            clearTimeout(id);
            resolve('Time out');
          }, 4000);
        }),
      ]);

      await expect(promiseRace).resolves.toBe('Time out');
      expect(mockedWarn).toBeCalledWith(
        { ip: '::ffff:127.0.0.1' },
        'Rate limiter triggered'
      );
    });
  });
});
