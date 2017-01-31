const queryPromise = require('../lib/queryPromise');

module.exports = function (connection, user) {
  const qp = queryPromise(connection);
  return qp('SELECT * from brideAndGroom WHERE name=?', user.name)
      .then(function (row) {
        if (row.length && row[0].password == user.password) {
          return {
            status: "logged_in",
            token: Math.random().toString(36).substr(2, 5)
          }
        } else {
          return {
            status: "not_authorized"
          }
        }
      })
};