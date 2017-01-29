const queryPromise = require('../../lib/queryPromise');

module.exports = function (connection, modification) {
  const qp = queryPromise(connection);
  return qp('UPDATE availablePresents SET ?', modification)
};