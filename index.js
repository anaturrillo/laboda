const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const sayHullo = require('./services/sayHullo.js');
const port = config.port;
const app = express();

app.use(bodyParser.json());
app.use('/api', sayHullo());

app.listen(port, function () {
  console.log('listening on port ' + port)
});