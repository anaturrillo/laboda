const queryPromise = require('../lib/queryPromise');

module.exports = function (connection, req) {
  const gift = req.body;

  const qp = queryPromise(connection);

  return qp('INSERT INTO gifts SET ?', gift);
};