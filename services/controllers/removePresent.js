const queryPromise = require('../../lib/queryPromise');

module.exports = function (connection, present) {
  const qp = queryPromise(connection);
  return qp('DELETE FROM availablePresents WHERE id = ?', present.id)
};