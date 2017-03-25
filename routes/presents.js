const express = require('express');
const validateToken = require('./../services/validateToken');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/uploads/images/')
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
const getCategories  =        require('../services/getCategories');
const addCategory =           require('../services/addCategory');
const getGifts =              require('../services/getGifts');

module.exports = function (connection) {
  const router = express.Router();
  const vt = validateToken(connection);

  router.post('/', vt.validate, uploadImage.single('image'), function (req, res) {
    createPresent(connection, req)
        .then( _ => res.redirect('/lista.html'))
        .catch(function(err){
          console.error("POST /regalos", err);
          res.json({error: err});
        });
  });

  router.delete('/', vt.validate, function (req, res) {
    removePresents(connection, req)
        .then(_ =>  res.json({status: "ok"}))
        .catch(function (err) {
          console.error("Error in DELETE /present", err);
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

  router.get('/categorias', vt.validate, function (req, res) {
    getCategories(connection)
        .then(function (categories) {
          res.json(categories);
        })
        .catch(function(err){
          console.error("GET /categorias", err);
          res.status(500);
          res.json({error: err});
        });
  });

  router.post('/categorias', vt.validate, function (req, res) {
    addCategory(connection, req)
        .then(_ => res.json({status:'ok'}))
        .catch(function(err){
          console.error("GET /categorias", err);
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

  router.get('/regalados', function (req, res) {
    getGifts(connection)
        .then(function(presents){
          res.json(presents);
        })
        .catch(function(err){
          console.error("GET /regalados", err);
          res.status(500);
          res.json({error: err});
        });
  });

  return router
};