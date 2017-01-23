module.exports = connection => query => {
  return new Promise(function (resolve, reject) {
    connection.query(query,  function (err, row) {
      if(err){
        reject(err)
      }else{
        resolve(row)
      }
    })
  })
};