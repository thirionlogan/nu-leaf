const db = require('./data/db');
const bookshelf = require('bookshelf')(db);

const User = bookshelf.model('User', {
  tableName: 'user',
});

module.exports = { User };
