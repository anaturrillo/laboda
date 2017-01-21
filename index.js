const express = require('express');
const bodyParser = require('body-parser');
const sayHullo = require('./services/sayHullo.js');
const port = 8000;
const app = express();

app.use(bodyParser.json());
app.use('/api', sayHullo());

app.listen(port, function () {
  console.log('listening on port ' + port)
});