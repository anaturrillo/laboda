const queryPromise = require('./lib/queryPromise.js');
module.exports = function (connection) {
  const qp = queryPromise(connection);

  const availablePresents = 'CREATE TABLE IF NOT EXISTS availablePresents (' +
      'id INT AUTO_INCREMENT UNIQUE NOT NULL, ' +
      'name VARCHAR(255), ' +
      'description TEXT, ' +
      'price INT, ' +
      'ammount INT, ' +
      'status VARCHAR(30), ' +
      'date datetime DEFAULT CURRENT_TIMESTAMP, ' +
      'PRIMARY KEY (id))';

  const giftsReceived = 'CREATE TABLE IF NOT EXISTS giftsReceived (' +
      'id INT AUTO_INCREMENT UNIQUE NOT NULL, ' +
      'fromName VARCHAR(255), ' +
      'message TEXT, ' +
      'present INT, ' +
      'date datetime DEFAULT CURRENT_TIMESTAMP, ' +
      'PRIMARY KEY (id))';

  const brideAndGroom = 'CREATE TABLE IF NOT EXISTS brideAndGroom (' +
      'name VARCHAR(10) UNIQUE NOT NULL, ' +
      'password VARCHAR(100), ' +
      'token VARCHAR(5))';

  const createUsers = 'INSERT IGNORE INTO brideAndGroom ' +
      '(name,password) ' +
      'VALUES ("flor", "16ece45ed0201c414ef8efd66af2dc51354cd964"), ' +
      '("lenny", "16ece45ed0201c414ef8efd66af2dc51354cd964") ';

  return qp(availablePresents)
      .then(_ => qp(giftsReceived))
      .then(_ => qp(brideAndGroom))
      .then(_ => qp(createUsers));
};