const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const presents = require('./services/presents');
const login = require('./services/login');
const initializeDB = require('./initializeDB');

const config = require('./config');
const port = config.port;
const app = express();

const connection = mysql.createConnection(config.db_connect);

app.use(bodyParser.json());

initializeDB(connection)
    .then(function (row) {
      app.use('/api', presents(connection));
      app.use('/api', login(connection))
    })
    .catch(function (e) {
      console.error(e)
    });

app.listen(port, function () {
  console.log('listening on port ' + port)
});