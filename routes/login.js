const express = require('express');
const toLogin = require('./../services/controllers/login');

module.exports = function (connection) {
  const router = express.Router();

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