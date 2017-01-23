const queryPromise = require('../../lib/queryPromise');

module.exports = function (connection) {
  const qp = queryPromise(connection)('');
  return qp('SELECT * FROM availablePresents')
};