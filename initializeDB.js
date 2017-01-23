const queryPromise = require('./lib/queryPromise.js');
module.exports = function (connection) {
  const qp = queryPromise(connection);

  const availablePresents = 'CREATE TABLE IF NOT EXISTS availablePresents (' +
      'id INT, ' +
      'name VARCHAR(255), ' +
      'description TEXT, ' +
      'price INT, ' +
      'ammount INT, ' +
      'status VARCHAR(30),' +
      'PRIMARY KEY (id))';

  const giftsReceived = 'CREATE TABLE IF NOT EXISTS giftsReceived (' +
      'id INT, ' +
      'fromName VARCHAR(255), ' +
      'message TEXT, ' +
      'present INT, ' +
      'date DATE, ' +
      'PRIMARY KEY (id))';

  return qp(availablePresents)
      .then(_ => qp(giftsReceived));
};