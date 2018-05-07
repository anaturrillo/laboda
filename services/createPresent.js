const queryPromise = require('../lib/queryPromise');

module.exports = connection => function (present) {
  const qp = queryPromise(connection);

  return qp('INSERT INTO presents SET ?', present);
};