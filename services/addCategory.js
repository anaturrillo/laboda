const queryPromise = require('../lib/queryPromise');

module.exports = function (connection, req) {
  const qp = queryPromise(connection);

  return qp('INSERT INTO categories SET name=?', req.body.name);
};