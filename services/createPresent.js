const queryPromise = require('../lib/queryPromise');

module.exports = function (connection, req) {
  const present = req.body;

  const qp = queryPromise(connection);

  present.status = 'disponible';
  if (req.file) {
    present.image = req.file.filename;
  } else {
    present.image = 'default.jpg'
  }

  return qp('INSERT INTO presents SET ?', present);
};