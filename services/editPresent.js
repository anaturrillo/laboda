const queryPromise = require('../lib/queryPromise');
const MP = require ("mercadopago");
const c = require("../config");

module.exports = function (connection, modification) {
  const qp = queryPromise(connection);
  const mp = new MP (c.keys.Client_id, c.keys.Client_secret);

  return qp('SELECT * FROM availablePresents WHERE id=?', modification.id)
    .then(function (row) {
      const newRow = Object.assign(row[0], modification);

      return qp('UPDATE availablePresents SET ? WHERE id=?', [newRow, newRow.id]);
    })
};