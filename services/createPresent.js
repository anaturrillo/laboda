const queryPromise = require('../lib/queryPromise');

module.exports = function (connection, req) {
  const present = req.body;

  const qp = queryPromise(connection);

  present.status = 'disponible';
  present.image = req.file.filename;

  return qp('INSERT INTO presents SET ?', present);
};