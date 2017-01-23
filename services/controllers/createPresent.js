const queryPromise = require('../../lib/queryPromise');

module.exports = function (connection, present) {
  const qp = queryPromise(connection);

  present.status = 'available';

  const post = qp(present);

  return post('INSERT INTO availablePresents SET ?', present);
};