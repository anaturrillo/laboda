const express = require('express');
const validateToken = require('../services/controllers/validateToken');
const getAvailablePresents =  require('../services/controllers/getAvailablePresents.js');
const getAllPresents = require('../services/controllers/getAllPresents');

module.exports = function (connection) {
  const router = express.Router();
  const vt = validateToken(connection);

  router.get('', function (req, res) {
    res.render('index', {className: 'index'});
  });

  router.get('/novios', function (req, res) {
    res.render('login', {className: 'login-novios'});
  });

  router.get('/lista', function (req, res) {
    vt(getAllPresents)
        .get(req)
        .then(result => {
          if (result.status == 'ok'){
            const presents = result.json;
            const presentsKeys = Object.keys(presents[0]);
            res.render('presentsList', {presents, presentsKeys, className: 'present-list'});

          } else {
            res.render('presentsList', {className: 'present-list'});
          }
        })
        .catch(console.error)
  });

  router.get('/regalos-disponibles', function (req, res) {
    getAvailablePresents(connection)
        .then(result => {
          if (result.status == 'ok') {
            result.response.then(presents => {
              const presentsKeys = Object.keys(presents[0]);
              res.render('presentsList', {presents, presentsKeys, className: 'present-list'});
            });

          } else {
            res.render('presentsList', {className: 'present-list'});
          }

        })
        .catch(console.error)
  });
  return router
};