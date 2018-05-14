const queryPromise = require('../lib/queryPromise');

module.exports = connection => function (present) {
  const qp = queryPromise(connection);
  return qp('UPDATE presents SET ? WHERE id = ?', [present, present.id])
};