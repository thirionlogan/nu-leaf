const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('../data/db');

const app = express();

app.use(helmet());
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
app.use(cors());

app.get('/', async (req, res) => {
  res.sendStatus(200);
});

app.use((req, res) => {
  res.sendStatus(404);
});

module.exports = app;
