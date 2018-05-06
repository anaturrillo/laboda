const queryPromise = require('../lib/queryPromise');

module.exports = connection => function (weddingId) {

  const qp = queryPromise(connection);

  return qp('SELECT name FROM categories WHERE wedding_id=?', [weddingId])
};