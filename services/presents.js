const express = require('express');
const validateToken = require('./validateToken');

const createPresent =         require('./controllers/createPresent.js');
const editPresent =           require('./controllers/editPresent.js');
const removePresents =        require('./controllers/removePresent.js');
const getAllPresents =        require('./controllers/getAllPresents.js');

module.exports = function (connection) {
  const router = express.Router();
  const vt = validateToken(connection);



  router.post('/present', vt(createPresent).post);

  router.put('/present', vt(editPresent).post);
  
  router.post('/present/remove', vt(removePresents).post);

  router.post('/gifts', vt(getAllPresents).post);

  return router
};