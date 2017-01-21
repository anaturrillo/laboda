const keys = require('./keys.js');

module.exports = {
  port: 8000,
  db_connect: {
    host     : 'localhost',
    user     : 'root',
    password : keys.dbpass,
    database : 'laboda'
  },
  keys: {
    Client_id: keys.Client_id,
    Client_secret: keys.Client_secret
  }
};