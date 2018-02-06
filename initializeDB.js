const queryPromise = require('./lib/queryPromise.js');
module.exports = function (connection) {
  const qp = queryPromise(connection);

  const availablePresents = 'CREATE TABLE IF NOT EXISTS presents (' +
      'id INT AUTO_INCREMENT UNIQUE NOT NULL, ' +
      'category VARCHAR(100), ' +
      'name VARCHAR(255), ' +
      'description TEXT, ' +
      'image VARCHAR(255), ' +
      'price INT, ' +
      'url TEXT,' +
      'status VARCHAR(100), ' +
      'PRIMARY KEY (id))';

  const categories = 'CREATE TABLE IF NOT EXISTS categories (' +
      'name VARCHAR(50) UNIQUE NOT NULL)';

  const brideAndGroom = 'CREATE TABLE IF NOT EXISTS brideAndGroom (' +
      'name VARCHAR(10) UNIQUE NOT NULL, ' +
      'password VARCHAR(100), ' +
      'token VARCHAR(5))';

  const createUsers = 'INSERT IGNORE INTO brideAndGroom ' +
      '(name,password) ' +
      'VALUES ("flor", "a29b3331851f9a6f0b9443d2208db1e7ea9ac922f467d825d14f83169193a96f"), ' +
      '("lenny", "a29b3331851f9a6f0b9443d2208db1e7ea9ac922f467d825d14f83169193a96f"), ' +
      '("anita", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3")';

  const gifts = 'CREATE TABLE IF NOT EXISTS gifts (' +
      'id INT AUTO_INCREMENT UNIQUE NOT NULL, ' +
      'presentId INT, ' +
      'message TEXT, ' +
      'status VARCHAR(30), ' +
      'fromName VARCHAR(255), ' +
      'transactionId TEXT,' +
      'PRIMARY KEY (id))';

  return qp(availablePresents)
      .then(_ => qp(categories))
      .then(_ => qp(brideAndGroom))
      .then(_ => qp(createUsers))
      .then(_ => qp(gifts));
};