const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const presents = require('./services/presents.js');
const initializeDB = require('./initializeDB.js');

const config = require('./config.js');
const port = config.port;
const app = express();

const connection = mysql.createConnection(config.db_connect);

app.use(bodyParser.json());

initializeDB(connection)
    .then(function (row) {
      //hacer cosas
      app.use('/api/presents', presents(connection));

    })
    .then(_ => connection.end())
    .catch(function (e) {
      console.error(e)
    });

app.listen(port, function () {
  console.log('listening on port ' + port)
});