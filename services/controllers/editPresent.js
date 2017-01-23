const queryPromise = require('../../lib/queryPromise');

module.exports = function (connection, modification) {
  const qp = queryPromise(connection);

  const post = qp(modification);

  return post('UPDATE availablePresents SET ?')
};