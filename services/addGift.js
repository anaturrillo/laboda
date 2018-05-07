const queryPromise = require('../lib/queryPromise');

module.exports = connection => function (gift) {
  const qp = queryPromise(connection);

  return qp('INSERT INTO gifts SET ?', gift);
};