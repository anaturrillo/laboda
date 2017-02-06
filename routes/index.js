const express = require('express');
const validateToken = require('./../services/validateToken');

module.exports = function (connection) {
  const router = express.Router();
  const vt = validateToken(connection);

  router.get('/', function (req, res) {
    res.render('index', {className: 'index'});
  });

  router.get('/novios', vt.login, function (req, res) {

    res.render('login', {className: 'login-novios'});
  });

  router.get('/error', function (req, res) {
    res.render('error')
  });

  return router
};