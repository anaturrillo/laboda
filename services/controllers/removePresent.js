const queryPromise = require('../../lib/queryPromise');

module.exports = function (connection, presentId) {
  const qp = queryPromise(connection);
  return qp('DELETE FROM availablePresents WHERE id = ?', presentId)
};