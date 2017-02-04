const queryPromise = require('../../lib/queryPromise');

module.exports = function (connection, present) {
  const qp = queryPromise(connection);

  present.status = 'disponible';

  return qp('INSERT INTO presents SET ?', present);
};