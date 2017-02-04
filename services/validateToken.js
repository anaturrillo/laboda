const queryPromise = require('./../lib/queryPromise');

module.exports = connection => function (next) {
  return {
    post: (req, res) => {
      const qp = queryPromise(connection);
      qp('SELECT * from brideAndGroom WHERE token=?', req.body.token)
          .then(function (result) {

            if(result.length == 1){
              next(connection, req.body.present)
                  .then(function (response) {
                    res.status(200);
                    res.json(response)
                  })
                  .catch(function (e) {
                    console.error(e)
                  })
            }else{
              res.status(403);
              res.json({error: "invalid token"})
            }
          })
    },
    get: (req, res) => {
      const qp = queryPromise(connection);
      const cookies = req
          .headers
          .cookie
          .replace(' ', '')
          .split(';')
          .reduce( (obj,e) => {
            const splitted = e.split('=');
            obj[splitted[0]] = splitted[1];
            return obj }, {} );

      return qp('SELECT * from brideAndGroom WHERE token=?', cookies.token)
          .then(function (result) {

            if(result.length == 1){
              return next(connection)
                  .then(function (response) {
                    return {
                      status: 200,
                      json: response
                    }
                  })
                  .catch(function (e) {
                    console.error(e)
                  })
            }else{
              return {
                status: 403,
                json: {error: "invalid token"}
              }
            }
          })
    }
  }
};