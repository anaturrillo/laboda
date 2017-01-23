module.exports = connection => post => query => {
  return new Promise(function (resolve, reject) {
    if (!post) post = null;
    connection.query(query, post, function (err, result) {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
};