const queryPromise = require('../../lib/queryPromise');

module.exports = function (connection) {

  const qp = queryPromise(connection);

  return qp('SELECT * FROM presents')
      .then(function (presents) {
        if (presents.length >= 1) {
          return {
            status: 'ok',
            response: presents
          }
        } else {
          return {
            status: 'not_ok',
            response: 'no hay regalos disponibles'
          }
        }
      })

};