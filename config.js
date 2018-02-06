const keys = require('./keys.js');

module.exports = {
  port: 8000,
  db_connect: {
    host     : 'localhost',
    user     : 'pepe',
    password : keys.dbpass,
    database : 'laboda'
  },
  db_test_connect: {
    host     : 'localhost',
    user     : 'pepe',
    password : keys.dbpass,
    database : 'test'
  },
  keys: {
    Client_id: keys.Client_id,
    Client_secret: keys.Client_secret
  }
};