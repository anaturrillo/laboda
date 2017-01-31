const queryPromise = require('../../lib/queryPromise');

module.exports = function (connection, present, presentExtras) {
  const qp = queryPromise(connection);
  qp('SELECT * FROM availablePresents WHERE id=?', present.id)
      .then(row => {
        const gift = Object.assign(row[0], presentExtras);
        return Promise.all([qp('INSERT INTO recievedGifts ?', gift), row])
      })
      .then( prom => {
        const row = prom[1];
        if (row.ammount > 1) {
          return qp('UPDATE availablePresents WHERE id=? SET ammount"', [row.id, row.ammount -1])
        } else {
          return qp('UPDATE availablePresents WHERE id=? SET status="purchased"', row.id)
        }
      })

};