const queryPromise = require('../../lib/queryPromise');
const validateToken = require('../../lib/validateToken');
const tokenError = require('../../lib/tokenError');

module.exports = function (connection, present) {
  const qp = queryPromise(connection);

  present.status = 'available';
  validateToken(connection, present.token).then(function (tokenValidation) {
    if (tokenValidation.authorized) {
      return qp('INSERT INTO availablePresents SET ?', present);
    } else {
      return tokenError();
    }
  });
};