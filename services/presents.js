const express = require('express');
const validateToken = require('./controllers/validateToken');
const multer = require('multer');
const storage = multer.diskStorage({
  destination:function (req, file, cb) {
    cb(null, __dirname +  '/../public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const uploadImage = multer({storage:storage});

const createPresent =         require('./controllers/createPresent.js');
const editPresent =           require('./controllers/editPresent.js');
const removePresents =        require('./controllers/removePresent.js');
const getAllPresents =        require('./controllers/getAllPresents.js');

module.exports = function (connection) {
  const router = express.Router();
  const vt = validateToken(connection);

  router.post('/present',uploadImage.single('image'), function (req, res) {
    vt(createPresent)
        .get(req)
        .then(function (response) {
          getAllPresents(connection)
              .then(result => {
                if (result.status == 'ok') {
                  const presents = result.response;
                  const presentsKeys = Object.keys(presents[0]);
                  res.render('presentsList', {presents, presentsKeys, className: 'present-list'});

                } else {
                  res.render('presentsList', {className: 'present-list'});
                }

              })

        })
        .catch(console.error)
  });

  router.put('/present', vt(editPresent).post);
  
  router.post('/present/remove', vt(removePresents).post);


  return router
};