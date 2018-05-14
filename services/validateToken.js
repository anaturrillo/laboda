const queryPromise = require('./../lib/queryPromise');

module.exports = connection => {
  return {
    validate: function (req, res, next) {
      const qp = queryPromise(connection);
      return qp('SELECT * from users WHERE token=?', req.cookies.token)
          .then(function(result){
             if (result.length > 0) {
               next();
             } else {
               //res.status(403);
               //res.json({message: 'no autorizado'})
               console.info('validateToken.validate: forbidden', req.cookies.token)
               //res.redirect(`boda/${req.params.id}/login`);
               res.json({forbidden: true})
             }

          })
          .catch(function(e){
            res.status(500);
            res.json({'error':e})
          });
    },
    login: function (req, res, next) {
      const qp = queryPromise(connection);

      return qp('SELECT * from users WHERE token=?', req.cookies.token)
          .then(function(result){
            if (result.length === 0) {
              next()
            } else {
              res.redirect(`/boda/${req.params.id}/lista`);
            }
          })
          .catch(function(e){
            res.status(500);
            res.json({'error': e})
          });
    }
  }
};