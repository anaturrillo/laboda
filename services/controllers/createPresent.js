const queryPromise = require('../../lib/queryPromise');

module.exports = function (connection, present) {
  const qp = queryPromise(connection);

  present.status = 'available';

  return qp('INSERT INTO availablePresents SET ?', present);
};