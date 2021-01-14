require('dotenv').config({ path: '../.env' });
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    migrations: {
      directory: './server/data/migrations',
    },
    seeds: { directory: './server/data/seeds' },
  },
  production: process.env.DATABASE_URL || {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};
