const express = require('express');
const validateToken = require('./../services/validateToken');

module.exports = function (connection) {
  const router = express.Router({mergeParams:true});
  const vt = validateToken(connection);

  router.get('/', vt.validate, function (req, res) {
    res.json({ status: "logged_in" })
  });

  return router;
};