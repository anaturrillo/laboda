const queryPromise = require('./queryPromise');

module.exports = connection => (req, res, next) => {
  const qp = queryPromise(connection);
  qp('SELECT * from brideAndGroom WHERE token=?', req.body.token)
      .then(function (result) {
        if(result.length == 1){
          next(connection, req.present)
              .then(function (response) {
                res.status(200);
                res.json(response)
              })
        }else{
          res.status(403);
          res.json({error: "invalid token"})
        }
      })
};