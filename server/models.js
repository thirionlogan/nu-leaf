const db = require('./data/db');
const bookshelf = require('bookshelf')(db);

const User = bookshelf.model('User', {
  tableName: 'user',
  resolutions() {
    return this.hasMany(Resolution);
  },
});

const Resolution = bookshelf.model('Resolution', {
  tableName: 'resolution',
  user() {
    return this.belongsTo(User);
  },
});

module.exports = { User, Resolution };
