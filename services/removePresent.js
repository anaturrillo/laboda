const queryPromise = require('../lib/queryPromise');

module.exports = function (connection, req) {
  const qp = queryPromise(connection);
  const presentId = req.body.id;
  return qp('DELETE FROM presents WHERE id = ?', presentId)
};