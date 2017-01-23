const queryPromise = require('../../lib/queryPromise');

module.exports = function (connection, presentId) {
  const qp = queryPromise(connection);
  const post = qp(presentId);
  return post('DELETE FROM availablePresents WHERE id = ?')
};