const express = require('express');
const validateToken = require('../lib/validateToken');

const createPresent =   require('./controllers/createPresent.js');
const editPresent =     require('./controllers/editPresent.js');
const removePresents =  require('./controllers/removePresent.js');
const getPresents =     require('./controllers/getPresents.js');

module.exports = function (connection) {
  const router = express.Router();
  const vt = validateToken(connection);

  router.get('/presents/list', function (req, res) {
      getPresents(connection)
          .then(list => {
            res.status(200);
            res.json(list);
            connection.end()
          })
          .catch(console.error)
  });

  /*router.post('/create', function (req, res) {
    createPresent(connection)
        .then(present => res.json(present))

  });*/

  router.post('/present', vt, createPresent);

  router.put('/present', function (req, res) {
    editPresent(connection)
        .then(present => res.json(present))
  });
  
  router.post('/present/remove', function (req, res) {
    removePresent(connection)
        .then(present => res.json(present))
  });

  return router
};