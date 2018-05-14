const queryPromise = require('../lib/queryPromise');

module.exports = connection => function (presentId) {

  const qp = queryPromise(connection);

  return qp(`SELECT * FROM presents WHERE id=?`, presentId)
};
