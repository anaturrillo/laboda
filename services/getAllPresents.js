const queryPromise = require('../lib/queryPromise');

module.exports = function (connection) {

  const qp = queryPromise(connection);

  return qp('SELECT id, category,	name,	description, image, price, status FROM presents')
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