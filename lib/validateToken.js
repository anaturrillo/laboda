const queryPromise = require('../../lib/queryPromise');

module.exports = connection => (req, res, next) => {
  const qp = queryPromise(connection);
  qp('SELECT * WHERE token=?', req.body.token)
      .then(function (result) {
        if(result.length == 1){
          next(connection, req.present)
        }else{
          res.status(403);
          res.json({error: "invalid token"});
        }
      })
};