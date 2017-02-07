const queryPromise = require('../lib/queryPromise');

module.exports = function (connection, data) {


  const qp = queryPromise(connection);

  return qp('UPDATE presents SET status=? WHERE id=?', [data.status, data.itemId]);
};