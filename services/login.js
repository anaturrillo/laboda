const queryPromise = require('../lib/queryPromise');
require('../lib/SHA256');

module.exports = connection => function (user) {
  const qp = queryPromise(connection);
  const shaedPwd = SHA256(user.password);

  return qp('SELECT * from brideAndGroom WHERE name=? AND password=?', [user.name, shaedPwd])
      .then(function (row) {
        if (row.length) {

          const tk = Math.random().toString(36).substr(2, 5);

          return qp('UPDATE brideAndGroom SET token=? WHERE name=?', [tk, user.name])
              .then(function () {
                return {
                  status: 200,
                  body: {
                    status: "logged_in",
                    token: tk,
                    name: user.name
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