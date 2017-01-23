const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const sayHullo = require('./services/sayHullo.js');
const initializeDB = require('./initializeDB.js');

const config = require('./config.js');
const port = config.port;
const app = express();

const connection = mysql.createConnection(config.db_connect);

app.use(bodyParser.json());
app.use('/api', sayHullo());

initializeDB(connection)
    .then(function (row) {
      //hacer cosas

    })
    .then(_ => connection.end())
    .catch(function (e) {
      console.error(e)
    });

app.listen(port, function () {
  console.log('listening on port ' + port)
});