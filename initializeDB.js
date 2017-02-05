const queryPromise = require('./lib/queryPromise.js');
module.exports = function (connection) {
  const qp = queryPromise(connection);

  const availablePresents = 'CREATE TABLE IF NOT EXISTS presents (' +
      'id INT AUTO_INCREMENT UNIQUE NOT NULL, ' +
      'name VARCHAR(255), ' +
      'description TEXT, ' +
      'image VARCHAR(255), ' +
      'price INT, ' +
      'status VARCHAR(30), ' +
      'fromName VARCHAR(255), ' +
      'message TEXT,' +
      'PRIMARY KEY (id))';

  const brideAndGroom = 'CREATE TABLE IF NOT EXISTS brideAndGroom (' +
      'name VARCHAR(10) UNIQUE NOT NULL, ' +
      'password VARCHAR(100), ' +
      'token VARCHAR(5))';

  const createUsers = 'INSERT IGNORE INTO brideAndGroom ' +
      '(name,password) ' +
      'VALUES ("flor", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"), ' +
      '("lenny", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3") ';

  return qp(availablePresents)
      .then(_ => qp(brideAndGroom))
      .then(_ => qp(createUsers));
};