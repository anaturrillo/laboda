const express = require('express');
const validateToken = require('./../services/validateToken');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const uploadImage = multer({storage: storage});

const createPresent =         require('./../services/createPresent.js');
const editPresent =           require('./../services/editPresent.js');
const removePresents =        require('./../services/removePresent.js');
const getAllPresents =        require('./../services/getAllPresents.js');
const getAvailablePresents =  require('../services/getAvailablePresents.js');

module.exports = function (connection) {
  const router = express.Router();
  const vt = validateToken(connection);

  router.post('/', vt.validate, uploadImage.single('image'), function (req, res) {
    createPresent(connection, req)
        .then( _ => res.redirect("/regalos/lista"))
        .catch(function(err){
          console.error("POST /regalos", err);
          res.render('error', {className: 'present-list', error: err});
        });
  });

  router.delete('/', vt.validate, function (req, res) {
    removePresents(connection, req)
        .then(_ =>  res.json({status: "ok"}))
        .catch(function (e) {
          console.error("Error in DELETE /present", e);
          res.status(500);
          res.json({status: "error"})
        })
  });

  router.get('/lista', vt.validate, function (req, res) {
    getAllPresents(connection)
        .then(function (presents) {
          res.json(presents);
        })
        .catch(function(err){
          console.error("GET /lista", err);
          res.status(500);
          res.json({error: err});
        });

  });

  router.get('/disponibles', function (req, res) {
    getAvailablePresents(connection)
        .then(function(presents){
          res.json(presents);
        })
        .catch(function(err){
          console.error("GET /diponibles", err);
          res.status(500);
          res.json({error: err});
        });
  });

  return router
};