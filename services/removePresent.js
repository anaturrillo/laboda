const queryPromise = require('../lib/queryPromise');

module.exports = connection => function (presentId) {
  const qp = queryPromise(connection);
  return qp('UPDATE presents SET deleted=\'Y\' WHERE id = ?', presentId)
};