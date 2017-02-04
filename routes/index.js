const express = require('express');
const validateToken = require('../services/validateToken');
const getAvailablePresents =  require('../services/controllers/getAvailablePresents.js');
const getAllPresents = require('../services/controllers/getAllPresents');

module.exports = function (connection) {
  const router = express.Router();
  const vt = validateToken(connection);

  router.get('', function (req, res) {
    res.render('index');
  });

  router.get('/novios', function (req, res) {
    res.render('login');
  });

  router.get('/regalos-disponibles', function (req, res) {
    vt(getAllPresents)
        .get(req)
        .then(function (result) {
          if (result.status == 200){
            const presents = result.json;
            const presentsKeys = Object.keys(presents[0]);
            res.render('presentsList', {presents, presentsKeys});

          } else {
            res.status(result.status);
            res.json(result.json)
          }
        })
        .catch(console.error)
  });

  router.get('/presents/lista', function (req, res) {
    getAvailablePresents(connection)
        .then(list => {
          res.status(200);
          res.json(list);
        })
        .catch(console.error)
  });
  return router
};