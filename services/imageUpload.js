const express = require('express');
const router = express.Router();
const multer = require('multer');

const uploading = multer({
  dest: __dirname + '../public/uploads/',
});

router.post('/upload', uploading, function(req, res) {

});

module.exports = router;