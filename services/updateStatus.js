const queryPromise = require('../lib/queryPromise');

module.exports = function (connection, data) {


  const qp = queryPromise(connection);

  return qp('UPDATE gifts SET payment_status=? WHERE transaction_id=?', [data.status, data.transactionId]);
};