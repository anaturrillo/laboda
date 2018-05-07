const queryPromise = require('../lib/queryPromise');

module.exports = connection => function (category) {
  const qp = queryPromise(connection);

  return qp('INSERT INTO categories SET ?', category);
};