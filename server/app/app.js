const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('../data/db');
const path = require('path');

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'default-src': ["'self'"],
        'script-src': ["'self'"],
        'style-src': ["'self'", '*.googleapis.com'],
        'font-src': ["'self'", '*.googleapis.com'],
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

app.use(express.static(path.resolve('./build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./build', 'index.html'));
});

app.get('/api', async (req, res) => {
  res.sendStatus(200);
});

app.use((req, res) => {
  res.sendStatus(404);
});

module.exports = app;
