const express = require('express');
const getWeddings = require('../services/getWeddings');

module.exports = function (connection) {
  const router = express.Router({mergeParams:true});

  router.get('/', function (req, res) {
    res.sendFile(`bodas.html`, {root: 'public'})
  });

  router.get('/lista', function (req, res) {
    getWeddings(connection)
      .then(function (weddings) {
        res.json({weddings});
      })
      .catch(function(err){
        console.error("GET /lista", err);
        res.status(500);
        res.json({error: err});
      });
  });
  return router
};