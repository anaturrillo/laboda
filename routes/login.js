const express = require('express');
const toLogin = require('./../services/login');
const validateToken = require('./../services/validateToken');

module.exports = function (connection) {
  const router = express.Router();
  const vt = validateToken(connection);

  router.post('/', function (req, res) {
    const user = req.body;
    const login = toLogin(connection);

    return login(user)
        .then(function (r) {
          res.status(r.status);
          res.json(r.body);
        })
  });

  return router
};