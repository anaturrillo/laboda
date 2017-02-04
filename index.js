const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const routes = require('./routes');
const presents = require('./services/presents');
const login = require('./services/login');
const initializeDB = require('./initializeDB');

const config = require('./config');
const port = config.port;
const app = express();

const connection = mysql.createConnection(config.db_connect);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connection.connect();
app.set('view engine', 'jade');



app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

initializeDB(connection)
    .then(function (row) {
      app.use('/api', presents(connection));
      app.use('/api', login(connection));
      app.use('/', routes(connection));
    })
    .catch(function (e) {
      console.error(e)
    });
app.listen(port, function () {
  console.log('listening on port ' + port)
});