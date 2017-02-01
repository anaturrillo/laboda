const queryPromise = require('../../lib/queryPromise');

module.exports = connection => function (user) {
  const qp = queryPromise(connection);

  return qp('SELECT * from brideAndGroom WHERE name=? AND password=?', [user.name, user.password])
      .then(function (row) {
        if (row.length) {

          const tk = Math.random().toString(36).substr(2, 5);

          return qp('UPDATE brideAndGroom SET token=? WHERE name=?', [tk, user.name])
              .then(function () {
                return {
                  status: 200,
                  body: {
                    status: "logged_in",
                    token: tk
                  }
                }

              })

        } else {
          return {
            status: 403,
            body: {
              status: "not_authorized"
            }
          }
        }
      })
};