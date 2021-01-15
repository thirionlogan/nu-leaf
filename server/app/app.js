const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('../data/db');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const nunjucks = require('nunjucks');
const { createUser, authenticateLogin } = require('../services/userService');
const {
  getAllResolutions,
  getResolutionById,
  createResolution,
  patchResolution,
  deleteResolution,
} = require('../services/resolutionService');
const errorHandler = require('../middleware/errorHandler');
const authenticationRequired = require('../middleware/authenticationRequired');
const app = express();

nunjucks.configure('build', {
  autoescape: true,
  express: app,
});

app.use((req, res, next) => {
  res.locals.styleNonce = Buffer.from(uuidv4()).toString('base64');
  next();
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'default-src': ["'self'"],
        'script-src': ["'self'"],
        'style-src': [
          "'self'",
          'fonts.googleapis.com',
          'fonts.gstatic.com',
          (req, res) => `'nonce-${res.locals.styleNonce}'`,
        ],
        'font-src': ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com'],
        'img-src': ["'self'", 'images.squarespace-cdn.com', 'data:'],
      },
    },
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: bcrypt.genSaltSync(10),
    cookie: {
      maxAge: 600000,
      secure: false, // TODO true with https support
    },
    store: new KnexSessionStore({ knex, createtable: false }),
    saveUninitialized: false,
    resave: false,
    unset: 'destroy',
  })
);
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost:3001',
      'https://localhost:3001',
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  })
);

app.use(errorHandler);

app.use('/static', express.static(path.resolve('./build/static')));
app.use(
  '/asset-manifest.json',
  express.static(path.resolve('./build/asset-manifest.json'))
);
app.use('/robots.txt', express.static(path.resolve('./build/robots.txt')));

app.get('/', (req, res) => {
  res.render('index.html', {
    styleNonce: res.locals.styleNonce,
  });
});

app.post('/api/register', async (req, res) => {
  createUser(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(422);
    });
});

const limitReached = (req, res) => {
  console.warn({ ip: req.ip }, 'Rate limiter triggered');
};
const options = {
  windowMs: 60000,
  max: 5,
  onLimitReached: limitReached,
  handler: limitReached,
};
const rateLimiter = rateLimit(options);

app.post('/api/login', rateLimiter, async (req, res) => {
  authenticateLogin(req.body)
    .then((user) => {
      req.session.user = user;
      res.status(200).send(user);
    })
    .catch(() => {
      res.sendStatus(401);
    });
});

app.post('/api/logout', async (req, res) => {
  req.session.user = undefined;
  res.sendStatus(200);
});

app.get('/api/resolution', (req, res) => {
  getAllResolutions().then((resolutions) => {
    res.status(200).send(resolutions);
  });
});

app.get('/api/resolution/:id', (req, res) => {
  getResolutionById({ id: req.params.id })
    .then((resolution) => {
      res.status(200).send(resolution);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

app.post('/api/resolution', authenticationRequired, (req, res) => {
  createResolution({
    userId: req.session.user.id,
    content: req.body.content,
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(422);
    });
});

app.patch('/api/resolution/:id', authenticationRequired, (req, res) => {
  patchResolution({ id: req.params.id, content: req.body.content })
    .then(() => {
      res.status(204).send();
    })
    .catch(() => {
      res.sendStatus(422);
    });
});
app.delete('/api/resolution/:id', authenticationRequired, (req, res) => {
  deleteResolution({ id: req.params.id })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

app.use((req, res) => {
  res.sendStatus(404);
});

module.exports = app;
