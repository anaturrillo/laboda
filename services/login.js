const express = require('express');
const toLogin = require('./controllers/login');

module.exports = function (connection) {
  const router = express.Router();

  router.post('/login', function (req, res) {
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