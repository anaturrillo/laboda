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
      const cookies = cookie2Object(req.headers.cookie || '');

      return qp('SELECT * from brideAndGroom WHERE token=?', cookies.token)
          .then(function(result){
             next();
          })
          .catch(function(e){
            console.error("validateToken.validate: forbidden", cookies.token);
            res.redirect('/login')
          });
    }
  }
};