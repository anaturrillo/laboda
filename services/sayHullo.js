const express = require('express');

module.exports = function () {
  const router = express.Router();

  router.get('/pepe', function (req, res) {
    res.json({la: 'hullo'})
  });

  return router
};