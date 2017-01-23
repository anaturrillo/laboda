const express = require('express');

const createPresent =   require('./controllers/createPresent.js');
const editPresent =     require('./controllers/editPresent.js');
const removePresents =  require('./controllers/removePresent.js');
const getPresents =     require('./controllers/getPresents.js');

module.exports = function (connection) {
  const router = express.Router();
  router.get('/list', function (req, res) {
      getPresents(connection).then(list => res.json(list))
  });

  router.post('/create', function (req, res) {
    createPresent(connection)
        .then(present => res.json(present))

  });

  router.post('/edit', function (req, res) {
    editPresent(connection)
        .then(present => res.json(present))
  });
  
  router.post('/remove', function (req, res) {
    removePresent(connection)
        .then(present => res.json(present))
  });

  return router
};