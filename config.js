const keys = require('./keys.js');

module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  db_connect: {
    host     : 'localhost',
    user     : 'pepe',
    password : keys.dbpass,
    database : 'laboda'
  },
  db_test_connect: {
    host     : 'localhost',
    user     : 'root',
    password : keys.dbpass,
    database : 'test'
  },
  keys: {
    Client_id: keys.Client_id,
    Client_secret: keys.Client_secret
  }
};

// {"id":319481358,"nickname":"TETE6252179","password":"qatest5492","site_status":"active","email":"test_user_67993019@testuser.com"}
// {"id":319478537,"nickname":"TESTFQQMXRPO","password":"qatest9319","site_status":"active","email":"test_user_58715532@testuser.com"}