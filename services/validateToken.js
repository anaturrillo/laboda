const queryPromise = require('./../lib/queryPromise');


function cookie2Object(cookie) {
  return cookie
      .replace(' ', '')
      .split(';')
      .reduce((obj, e) => {
        const splitted = e.split('=');
        obj[splitted[0]] = splitted[1];
        return obj
      }, {});
}


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
               //res.json({messaje: 'no autorizado'})
               console.info('validateToken.validate: forbidden', req.cookies.token)
               //res.redirect(`boda/${req.params.id}/login`);
               res.json({forbidden: true})
             }

          })
          .catch(function(e){
            console.error("validateToken.validate: error", cookies.token, e);
            res.status(500);
            res.json({'error':e})
          });
    },
    login: function (req, res, next) {
      const qp = queryPromise(connection);

      return qp('SELECT * from users WHERE token=?', req.cookies.token)
          .then(function(result){
            if (result.length == 0) {
              next()
            } else {
              res.redirect(`/boda/${req.params.id}/lista`);
            }

          })
          .catch(function(e){
            console.error("validateToken.validate: forbidden", req.cookies.token);
            res.status(500);
            res.json({'error': e})
          });
    }
  }
};