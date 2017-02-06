const queryPromise = require('../lib/queryPromise');

module.exports = function (connection, mo) {
  const itemId = mo.response.items[0].id;
  const status = mo.response.payments[0].status;

  const qp = queryPromise(connection);

  return qp('UPDATE presents SET status=? WHERE id=?', [status, itemId]);
};