const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mysql = require('mysql');

const routes = require('./routes');
const presents = require('./routes/presents');
const login = require('./routes/login');
const payment = require('./routes/payment');
const initializeDB = require('./initializeDB');

const config = require('./config');
const port = config.port;
const app = express();

const connection = mysql.createConnection(config.db_connect);

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'pug');
app.use(express.static('public/resources'));


initializeDB(connection)
    .then(function (row) {
      app.use('/', routes(connection));
      app.use('/login', login(connection));
      app.use('/regalos', presents(connection));
      app.use('/payment', payment(connection));
      app.use('/boda/:id/:file', function (req, res) {
        res.sendFile(`${req.params.file}.html`, {root: 'public'})
      });
    })
    .catch(function (e) {
      console.error(e)
    });

app.listen(port, function () {
  console.log('listening on port ' + port)
});