const express = require('express');
const validateToken = require('./../services/validateToken');
const config = require('../config');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/resources/uploads/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const uploadImage = multer({storage: storage});

const createPresentInit         = require('./../services/createPresent.js');
const editPresent               = require('./../services/editPresent.js');
const removePresentsInit        = require('./../services/removePresent.js');
const getAllPresentsInit        = require('./../services/getAllPresents.js');
const getAvailablePresentsInit  = require('../services/getAvailablePresents.js');
const getCategoriesInit         = require('../services/getCategories');
const addCategoryInit           = require('../services/addCategory');
const getGiftsInit              = require('../services/getGifts');
const addGiftInit               = require('../services/addGift');
const restorePresentsInit       = require('../services/updatePresents');
const getPresentInit            = require('../services/getPresent');

module.exports = function (connection) {
  const router               = express.Router({mergeParams:true});
  const vt                   = validateToken(connection);
  const createPresent        = createPresentInit(connection);
  const getAllPresents       = getAllPresentsInit(connection);
  const removePresents       = removePresentsInit(connection);
  const getCategories        = getCategoriesInit(connection);
  const addCategory          = addCategoryInit(connection);
  const getGifts             = getGiftsInit(connection);
  const addGift              = addGiftInit(connection);
  const getAvailablePresents = getAvailablePresentsInit(connection);
  const restorePresents      = restorePresentsInit(connection);
  const getPresent           = getPresentInit(connection);

  router.post('/', vt.validate, uploadImage.single('image'), function (req, res) {
    const weddingId = req.params.id;
    const present = {... req.body, wedding_id: weddingId};

    if (req.file) {
      present.image = `http://${config.host}:${config.port}/uploads/images/${req.file.filename}`;
    } else {
      present.image = `http://${config.host}:${config.port}/uploads/images/default.jpg`;
    }

    createPresent(present)
        .then( _ => res.redirect(`/boda/${weddingId}/lista`))
        .catch(function(err){
          console.error("POST /regalos", err);
          res.json({error: err});
        });
  });

  router.delete('/', vt.validate, function (req, res) {
    const presentId = req.body.id;
    removePresents(presentId)
        .then(_ =>  res.json({status: "ok"}))
        .catch(function (err) {
          console.error("Error in DELETE /present", err);
          res.status(500);
          res.json({status: "error"})
        })
  });

  router.patch('/', vt.validate, function (req, res) {
    const presentId = req.body.id;
    const newFields = req.body.present;
    getPresent(presentId)
      .then(function (present) {
        const updatedPresent = {...present[0], ...newFields};
        return restorePresents(updatedPresent)
          .then(_ =>  res.json({status: "ok"}))
      })
      .catch(function (err) {
        console.error("Error in PATCH /present", err);
        res.status(500);
        res.json({status: "error"})
      })
  });

  router.get('/lista', vt.validate, function (req, res) {
    const weddingId = req.params.id;

    getAllPresents(weddingId)
        .then(function (presents) {
          res.json({presents});
        })
        .catch(function(err){
          console.error("GET /lista", err);
          res.status(500);
          res.json({error: err});
        });
  });

  router.get('/categorias', vt.validate, function (req, res) {
    const weddingId = req.params.id;

    getCategories(weddingId)
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
    const weddingId = req.params.id;
    const category = {... req.body, wedding_id: weddingId};

    addCategory(category)
        .then(_ => res.json({status:'ok'}))
        .catch(function(err){
          console.error("GET /categorias", err);
          res.status(500);
          res.json({error: err});
        });
  });

  router.get('/disponibles', function (req, res) {
    getAvailablePresents(req.params.id)
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
    getGifts(req.params.id)
        .then(function(presents){
          res.json(presents);
        })
        .catch(function(err){
          console.error("GET /regalados", err);
          res.status(500);
          res.json({error: err});
        });
  });

  router.post('/regalados', function (req, res) {
    const gift = {... req.body, wedding_id: req.params.id};
    addGift(gift)
        .then(function(result){
          res.json(result);
        })
        .catch(function(err){
          console.error("POST /regalados", err);
          res.status(500);
          res.json({error: err});
        });
  });

  return router
};