
module.exports = (connection)=> (query, input) => {
    if (!input) input = '';
    return new Promise(function (resolve, reject) {
      connection.query(query, input, function (err, result) {
        if(err){
          reject(err)
        }else{
          resolve(result)
        }
      })
    })
};