const queryPromise = require('../../lib/queryPromise');

module.exports = function (connection, token) {
  const qp = queryPromise(connection);
  qp('SELECT * WHERE token=?', token)
      .then(function (result) {
        if(result.length == 1){
          return {
            authorized: true
          }
        }else{
          return {
            authorized: false
          }
        }
      })
};